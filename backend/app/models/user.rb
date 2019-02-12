class User < ApplicationRecord
  has_many :auth_token_infos
  has_many :auth_providers

  has_secure_password
end
