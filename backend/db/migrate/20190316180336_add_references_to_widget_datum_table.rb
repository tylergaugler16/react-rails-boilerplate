class AddReferencesToWidgetDatumTable < ActiveRecord::Migration[5.2]
  def change
    add_reference :widget_data, :widget_datable, polymorphic: true, index: true
  end
end
