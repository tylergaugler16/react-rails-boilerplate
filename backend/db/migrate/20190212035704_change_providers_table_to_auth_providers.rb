class ChangeProvidersTableToAuthProviders < ActiveRecord::Migration[5.2]
  def change
    rename_table :providers, :auth_providers
  end
end
