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

  # if access token
  # see if an auth providr exists
  # create one if not
  # if passowrd/eamil,
  # return auth_token_info

  def log_in
    if params[:google_token]
      google_auth_hash = authenticate_google_token(params[:google_token])
      auth_provider = AuthProvider.find_or_create_from_auth_hash(google_auth_hash)
      user = auth_provider.user
      render json: { token: nil, user: nil, message: 'Something went wrong!' } unless user.present?
      token = Token.issue(
        user_id: user.id
      )
      render json: { token: token, user: user, message: 'Congrats you have signed in!' }
    else
      user = User.find_by_email(params[:email])
      render json: { token: nil, user: nil, message: 'Something went wrong!' } unless user.present?
      if user.authenticate(params[:password])
        token = Token.issue(
          user_id: user.id
        )
      else
        render json: { token: nil, user: nil, message: 'Incorrect Password' }
      end
    end
  rescue StandardError => e
    Rails.logger.warn("error in authenitcations#log_in, #{e.message}")
    render json: { token: nil, user: nil, message: 'Something went wrong!' }
  end

  def sign_up
    sign_up_hash = {
      email: params[:email],
      first_name: params[:first_name],
      last_name: params[:last_name],
      password: params[:password]
    }
    user = User.find_by_email(params[:email])
    if user.present?
      auth_provider_info_hash = {
        uid: user.id,
        provider: 'Identity'
      }
      auth_provider = AuthProvider.find_or_create_from_auth_hash(
        sign_up_hash.merge(auth_provider_info_hash)
      )
      auth_provider.user.update!(sign_up_hash)
    else
      user = User.create!(sign_up_hash)
    end
    token = Token.issue(
      user_id: user.id
    )
    render json: { token: token, user: user, message: 'Successfully Signed Up!' }
  rescue StandardError => e
    Rails.logger.warn("error in authenitcations#sign_up, #{e.message}")
    render json: { token: nil, user: nil, message: 'Something went wrong!' }
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
