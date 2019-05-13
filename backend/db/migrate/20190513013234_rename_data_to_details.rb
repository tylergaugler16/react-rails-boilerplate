class RenameDataToDetails < ActiveRecord::Migration[5.2]
  def change
      rename_column :file_uploads, :data, :detail_data
  end
end
