# Module that provides authentication methods
module Authenticatable
  def authenticate
    false unless logged_in?
  end

  def logged_in?
    # use double bang becuase it ALWAYS returns a boolean
    !!current_user
  end

  def current_user
    return false if token.blank?
    puts "yooo #{token}"
    user = User.find(auth_hash['user_id'])
    @current_user ||= user if user
    @current_user
  end

  def authenticate_google_token(google_token)
    client_id = '1078865227946-n88q5b9jgmf5nolqppi1800e18ttsrfh.apps.googleusercontent.com'
    begin
      validator = GoogleIDToken::Validator.new
      jwt = validator.check(google_token, client_id, nil)
      {
        email: jwt['email'],
        uid: jwt['sub'],
        first_name: jwt['given_name'],
        last_name: jwt['family_name'],
        provider: 'Google Plus'
      }
    rescue GoogleIDToken::ValidationError => e
      puts "Cannot validate: #{e}"
    end
  end

  private

    def token
      request.env['HTTP_AUTHORIZATION'].scan(/Bearer(.*)$/).flatten.last
    end

    def auth_hash
      Token.decode(token)
    end

    def auth_present?
      # use double bang becuase it ALWAYS returns a boolean
      !!request.env.fetch('HTTP_AUTHORIZATION', '').scan(/Bearer/).flatten.first
    end

  # CLass that provides authentication token methods
    class Token
      require 'jwt'
      ALGORITHM = 'HS256'.freeze
  
      def self.issue(payload)
        payload[:exp] = (Time.now + 1.week).to_i
        JWT.encode(payload,
                   auth_secret,
                   ALGORITHM)
      end
  
      def self.decode(token)
        JWT.decode(token,
                   auth_secret,
                   false,
                   algorithm: ALGORITHM).first
      end
  
      def self.auth_secret
        ENV['REACT_RAILS_BOILERPLATE_AUTH_SECRET'] || "auth-secret"
      end
    end
end
