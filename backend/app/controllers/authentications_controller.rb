# Handling authenticated users
class AuthenticationsController < ApplicationController
  skip_before_action :verify_authenticity_token,
                     only: :handle_authenticated_user
  def handle_authenticated_user
    # @user = User.find_or_create_from_auth_hash(auth_hash)
    # self.current_user = @user
    puts "yoooo #{auth_hash.inspect}"
    redirect_to 'http://localhost:3000?auth_token=123344'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
