class AddTypeToWidgets < ActiveRecord::Migration[5.2]
  def change
    add_column :widgets, :data_type, :string
  end
end
