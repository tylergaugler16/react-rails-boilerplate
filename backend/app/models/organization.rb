class Organization < ApplicationRecord
  has_many :organization_memberships
  has_many :users, through: :organization_memberships

  def as_json(_options = {})
    super(only: [:name, :id])
  end
end
