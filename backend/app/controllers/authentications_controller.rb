# Handling authenticated users
class AuthenticationsController < ApplicationController
  skip_before_action :verify_authenticity_token,
                     only: :handle_oauth_authentication
  def handle_oathauthenticated_user
    # @user = User.find_or_create_from_auth_hash(auth_hash)
    # self.current_user = @user
    puts "yoooo #{auth_hash.inspect}"
    redirect_to 'http://localhost:3000?auth_token=123344'
  end

  def log_in
    # if access token
    # if passowrd/eamil,
    # return auth_token_info

    ati = AuthTokenInfo.new(user_id: user.id, expires_at: DateTime.now + 2.days,
                            source: ctx[:request].headers['HTTP_AUTHORIZATIONSOURCE'])
    { token: ati.generate_access_token!, user: user, initialMessage: initialMessage }
  end

  def handle_oauth_authentication
    auth_hash['provider'] = 'developer' if auth_hash['provider'].nil?
    auth_hash['uid'] = 'abc1234' if auth_hash['uid'].nil?
    auth_hash['info'] = { 'name' => 'Test Devloper', 'email' => 'tesetdev@fake.com' } if auth_hash['info'].nil?
    # used this auth provider method
    auth_provider = AuthProvider.find_or_create_from_auth_hash(auth_hash)
    # hasnt use this auth provider method, but used a different one

    redirect_to 'http://localhost:3000/login' unless auth_provider.user

    user = auth_provider.user
    at = user.generate_access_token
    redirect_to "http://localhost:3000?auth_token=#{at}"
  end

  # u = User.first
  # u.password = "1234ideclareathumbwar"
  # u.save!
  # u.authenticate("1234ideclareathumbwar") => <User>

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
