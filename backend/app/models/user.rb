class User < ApplicationRecord
  has_many :auth_token_infos
  has_many :auth_providers
  has_many :organization_memberships
  has_many :organizations, through: :organization_memberships

  validates :first_name, presence: true
  validates :email, presence: true
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  has_secure_password
end
