class AuthProvider < ApplicationRecord
  belongs_to :user

  def self.find_or_create_from_auth_hash(auth_hash)
    auth_provider = AuthProvider.find_by_name_and_uid(auth_hash['provider'], auth_hash['uid'])
    return auth_provider unless auth_provider.nil?
    user_email = auth_hash['info']['email']
    user = User.find_by_email(user_email)
    if user.nil?
      name = auth_hash['info']['name'].split(' ')
      user = User.create(email: user_email, first_name: name[0] || '', last_name: name[1] || '')
    end

    AuthProvider.create(name: auth_hash['provider'],
                        uid: auth_hash['uid'],
                        user_id: user.id)
  end
end
