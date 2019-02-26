class User < ApplicationRecord
  has_many :auth_token_infos
  has_many :auth_providers

  validates :first_name, presence: true
  validates :email, presence: true
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  has_secure_password
end
