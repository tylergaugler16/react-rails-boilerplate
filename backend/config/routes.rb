Rails.application.routes.draw do
  # auth routes
  post '/auth/:provider/callback', to: 'authentications#handle_oauth_authentication'

  resources :users
  get 'greetings/hello'
  get 'greetings/testing_greeting'

  namespace :api do
    get 'greetings/hello'
  end
end
