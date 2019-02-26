

OmniAuth.config.full_host = Rails.env.production? ? 'https://widgetly-app.herokuapp.com/' : 'http://localhost:3001'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
end
