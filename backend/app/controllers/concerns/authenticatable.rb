# Module that provides authentication methods
module Authenticatable
  def authenticate
    true
  end

  def current_user
    @current_user
  end
end
