class Workspace < ApplicationRecord
  has_many :workspace_memberships
  has_many :users, through: :workspace_memberships

  def as_json(_options = {})
    super(only: [:name, :id])
  end
end
