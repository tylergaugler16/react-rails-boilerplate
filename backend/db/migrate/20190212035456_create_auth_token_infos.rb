class CreateAuthTokenInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :auth_token_infos do |t|
      t.string :token
      t.datetime :expires_at
      t.timestamps
    end
  end
end
