class CreateOrganizationMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_memberships do |t|
      t.boolean :can_edit
      t.timestamps
    end
  end
end
