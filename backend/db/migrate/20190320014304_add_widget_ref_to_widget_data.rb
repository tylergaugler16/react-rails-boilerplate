class AddWidgetRefToWidgetData < ActiveRecord::Migration[5.2]
  def change
    add_reference :widget_data, :widget, foreign_key: true
  end
end
