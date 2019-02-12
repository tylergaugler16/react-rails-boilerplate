class AuthTokenInfo < ApplicationRecord
  belongs_to :user
  validates :token, uniqueness: { allow_nil: true }

  def generate_access_token!
    self.token = Digest::SHA1.hexdigest("#{Time.now}-#{user_id}-#{SecureRandom.hex}")
    save!
    token
  end
end
