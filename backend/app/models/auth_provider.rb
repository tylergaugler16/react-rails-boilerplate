class AuthProvider < ApplicationRecord
  belongs_to :user
  require 'securerandom'

  def self.find_or_create_from_auth_hash(auth_hash)
    auth_provider = AuthProvider.find_by_name_and_uid(auth_hash[:provider], auth_hash[:uid])
    return auth_provider unless auth_provider.nil?
    user_email = auth_hash[:email]
    user = User.find_by_email(user_email)
    if user.nil?
      generated_password = SecureRandom.base64(15)
      user = User.create!(
        email: user_email,
        first_name: auth_hash[:first_name] || '',
        last_name: auth_hash[:last_name] || '',
        password: auth_hash[:password] || generated_password
      )
    end

    AuthProvider.create!(name: auth_hash[:provider],
                         uid: auth_hash[:uid],
                         user_id: user.id)
  rescue StandardError => e
    Rails.logger.warn("ERROR: in auth_provider#find_or_create_from_auth_hash, #{e.message}")
  end
end
