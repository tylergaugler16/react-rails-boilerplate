class RemoveFieldsFromAudioDatum < ActiveRecord::Migration[5.2]
  def change
    remove_column :audio_data, :file_size
    remove_column :audio_data, :file_name
    remove_column :audio_data, :s3_object_url
  end
end
