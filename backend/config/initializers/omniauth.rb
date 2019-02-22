

OmniAuth.config.full_host = Rails.env.production? ? 'https://widgetly-app.herokuapp.com/' : 'http://localhost:3001'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :google_oauth2, 'my Google client id', 'my Google client secret',
           client_options: { ssl: { ca_file: Rails.root.join('cacert.pem').to_s } }
end
