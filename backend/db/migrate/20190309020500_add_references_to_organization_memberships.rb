class AddReferencesToOrganizationMemberships < ActiveRecord::Migration[5.2]
  def change
    add_reference :organization_memberships, :user, foreign_key: true
    add_reference :organization_memberships, :organization, foreign_key: true
  end
end
