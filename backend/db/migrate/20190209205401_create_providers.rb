class CreateProviders < ActiveRecord::Migration[5.2]
  def change
    create_table :providers do |t|
      t.string :name
      t.string :uid
      t.string :user_id
      t.timestamps
    end
  end
end
