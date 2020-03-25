Rails.application.routes.draw do
  # mount Shrine.uppy_s3_multipart(:cache) => "/s3"
  # auth routes
  post 'login', to: 'authentications#log_in'
  post 'signup', to: 'authentications#sign_up'
  get 'users/current_user', to: 'users#get_current_user'

  scope :api do
    get 'greetings/hello'
    get 'users/authenticated_header_info', to: 'users#authenticated_header_info'

    get 's3/sign', to: "authentications#get_aws_presigned_url"
  end
end
