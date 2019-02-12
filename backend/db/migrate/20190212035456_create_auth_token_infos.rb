class CreateAuthTokenInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :auth_token_infos do |t|
      t.string :token
      t.expires_at :datetime
      t.timestamps
    end
  end
end
