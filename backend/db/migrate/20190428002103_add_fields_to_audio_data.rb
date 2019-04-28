class AddFieldsToAudioData < ActiveRecord::Migration[5.2]
  def change
    add_column :audio_data, :s3_object_url, :string
    add_column :audio_data, :file_name, :string
  end
end
