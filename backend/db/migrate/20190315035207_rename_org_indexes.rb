class RenameOrgIndexes < ActiveRecord::Migration[5.2]
  def change
     rename_column :organization_memberships, :organization_id, :workspace_id
     rename_table :organization_memberships, :workspace_memberships
     rename_table :organizations, :workspaces
  end
end
