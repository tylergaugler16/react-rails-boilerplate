Rails.application.routes.draw do
  # auth routes
  post '/auth/:provider/callback', to: 'authentications#handle_authenticated_user'

  resources :users
  get 'greetings/hello'
  get 'greetings/testing_greeting'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
