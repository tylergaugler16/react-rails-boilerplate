Rails.application.routes.draw do
  # auth routes
  post '/auth/:provider/callback', to: 'authentications#handle_oauth_authentication'
  post 'login', to: 'authentications#log_in'
  post 'signup', to: 'authentications#sign_up'
  get 'users/current_user', to: 'users#get_current_user'

  scope :api do
    get 'greetings/hello'
    get 'users/authenticated_header_info', to: 'users#authenticated_header_info'

    get 'organizations', to: 'organizations#index'
  end
end
