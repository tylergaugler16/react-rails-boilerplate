# Handling authenticated users
class AuthenticationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  include Authenticatable

  def handle_oathauthenticated_user
    # @user = User.find_or_create_from_auth_hash(auth_hash)
    # self.current_user = @user
    puts "yoooo #{oauth_hash.inspect}"
    redirect_to 'http://localhost:3000?auth_token=123344'
  end

  def log_in
    # if access token
    # if passowrd/eamil,
    # return auth_token_info
    render json: { token: nil, user: nil, message: 'Something went wrong!' } if params[:email].blank?
    user = User.find_by_email(params[:email])
    render json: { token: nil, user: nil, message: 'Something went wrong!' } unless user.present?
    if user.authenticate(params[:password])
      token = Token.issue(
        user_id: user.id
      )
      render json: { token: token, user: user, message: 'Congrats you have signed in!' }
    else
      render json: { token: nil, user: nil, message: 'Incorrect Password' }
    end
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

  def oauth_hash
    request.env['omniauth.auth']
  end
end
