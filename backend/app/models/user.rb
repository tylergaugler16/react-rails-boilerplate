class User < ApplicationRecord
  has_many :auth_providers
  has_many :workspace_memberships
  has_many :workspaces, through: :workspace_memberships

  validates :first_name, presence: true
  validates :email, presence: true
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :email, uniqueness: true
  has_secure_password

  def as_json(_options = {})
    super(only: [:first_name, :last_name, :id],
          methods: [:full_name],
          include: {
            workspaces: { only: [:name, :id] }
          }
    )
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def has_access_to?(workspace)
    return false unless workspace
    WorkspaceMembership.where(user_id: id, workspace_id: workspace.id).exists?
  end

  def has_permission_to_edit?(workspace)
    return false unless workspace
    workspace_membership = WorkspaceMembership.where(user_id: id, workspace_id: workspace.id)
    return false unless workspace_membership.exists?
    workspace_membership.can_edit
  end

# TODO: THIS SHOULD ONLY EFFECt THE WORKSPACES THAT THIS USER OWNS
  def total_size_of_uploaded_files
    workspaces_for_user = workspaces.includes(:widgets)
    total_bytes = 0
    workspaces_for_user.each do |workspace|
      widgets = workspace.widgets
      widgets.each do |widget|
        total_bytes+= widget.data.pluck(:file_size).select{ |x| !x.nil? }.inject(0 , :+)
      end
    end
    pretty_value = FormatterService.bytes_to_pretty_string(total_bytes)
    {bytes: total_bytes, pretty_value: pretty_value}
  end
end
