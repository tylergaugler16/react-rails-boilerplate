# Module that provides authentication methods
module Authenticatable
  def authenticate
    true
    # determine whether a request is authenicated.
    auth_provider = Authorization.find_by_provider_and_uid(auth_hash['provider'], auth_hash['uid'])
  end

  def auth_hash
    request.env['omniauth.auth']
  end

  def current_user
    @current_user
  end
end
