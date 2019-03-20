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
end
