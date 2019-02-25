class DropAuthTokenInfosTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :auth_token_infos
  end
end
