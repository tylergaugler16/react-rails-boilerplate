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
          methods: [:full_name, :max_allowed_file_size],
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

  def max_allowed_file_size
    # this should be eventually based on subscription type
    five_gb = 1024 * 1024 * 1024 * 5 # 5GB
    return 0 if total_size_of_uploaded_files[:bytes] > five_gb
    five_gb
  end

# TODO: THIS SHOULD ONLY EFFECt THE WORKSPACES THAT THIS USER OWNS
# TODO: SHOULD REFACTOR THIS TO USE JOINS
  def total_size_of_uploaded_files
    return @total_size_of_uploaded_files if defined? @total_size_of_uploaded_files
    workspaces_for_user = workspaces.includes(:widgets)
    total_bytes = 0
    workspaces_for_user.each do |workspace|
      widgets = workspace.widgets
      widgets.each do |widget|
        next unless widget.data.any?
        file_size_array = widget.data.map{|d| d&.file_upload&.file_size || 0}.reject{|val|  val.nil? || val == 0 }
        sum = file_size_array.reduce{|sum, x| sum + x}
        total_bytes += (sum || 0)
      end
    end
    pretty_value = FormatterService.bytes_to_pretty_string(total_bytes)
    @total_size_of_uploaded_files = {bytes: total_bytes, pretty_value: pretty_value}
  end
end
