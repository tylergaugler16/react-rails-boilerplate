class AddAuthFieldsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :access_token, :string
    add_column :users, :access_token_expires_at, :datetime
    add_column :users, :password_digest, :string
 end
end
