class CreateWidgetData < ActiveRecord::Migration[5.2]
  def change
    create_table :widget_data do |t|
      t.string :type
      t.timestamps
    end
  end
end
