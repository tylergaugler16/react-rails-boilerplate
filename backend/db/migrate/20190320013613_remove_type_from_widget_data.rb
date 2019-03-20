class RemoveTypeFromWidgetData < ActiveRecord::Migration[5.2]
  def change
    remove_column :widget_data, :type, :string
  end
end
