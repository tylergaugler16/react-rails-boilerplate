class User < ApplicationRecord
  has_many :auth_token_infos
  has_many :auth_providers

  has_secure_password

  def generate_access_token
    '12345CJEI'
  end
end
