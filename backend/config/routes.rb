Rails.application.routes.draw do
  # auth routes
  post 'login', to: 'authentications#log_in'
  post 'signup', to: 'authentications#sign_up'
  get 'users/current_user', to: 'users#get_current_user'

  scope :api do
    get 'greetings/hello'
    get 'users/authenticated_header_info', to: 'users#authenticated_header_info'

    get 'workspaces', to: 'workspaces#index'
    get 'workspace', to: 'workspaces#show'

    get 'widgets', to: 'widgets#index'
    get 'widget', to: 'widgets#show'
    get 'widget/get_data', to: 'widgets#get_widget_data'
    post 'widgets/create', to: 'widgets#create'
    post 'widgets/update', to: 'widgets#update'
    post 'widgets/create_data', to: 'widgets#create_data_for_widget'

    get 's3/sign', to: "authentications#get_aws_presigned_url"
  end
end
