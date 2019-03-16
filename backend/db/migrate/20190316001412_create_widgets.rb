class CreateWidgets < ActiveRecord::Migration[5.2]
  def change
    create_table :widgets do |t|
      t.string :primary_color
      t.string :secondary_color
      t.string :tertiary_color
      t.string :header_text 
      t.string :subheader_text
      t.timestamps
    end
  end
end
