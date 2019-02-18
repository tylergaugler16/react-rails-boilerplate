# Module that provides authentication methods
module Authenticatable
  def authenticate
    render json: { error: 'unauthorized' }, status: 401 unless logged_in?
  end

  def logged_in?
    # use double bang becuase it ALWAYS returns a boolean
    !!current_user
  end

  # def auth_hash
  #   request.env['omniauth.auth']
  # end

  def current_user
    puts "yo, #{token} #{token.nil?} #{token.blank?}"
    return false if token.blank?
    puts "i'm getting here"
    user = User.find(auth_hash['user_id'])
    @current_user ||= user if user
    @current_user
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
      ENV['WIDGETLY_AUTH_SECRET']
    end
  end
end
