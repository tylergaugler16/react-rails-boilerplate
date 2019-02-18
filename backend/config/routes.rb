Rails.application.routes.draw do
  # auth routes
  post '/auth/:provider/callback', to: 'authentications#handle_oauth_authentication'
  post 'auth/login', to: 'authentications#log_in'
  get 'users/current_user', to: 'users#get_current_user'

  scope :api do
    get 'greetings/hello'
    get 'authentications/log_in'
  end
end
