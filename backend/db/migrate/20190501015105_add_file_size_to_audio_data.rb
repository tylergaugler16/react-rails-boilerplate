class AddFileSizeToAudioData < ActiveRecord::Migration[5.2]
  def change
    add_column :audio_data, :file_size, :integer, limit: 6
  end
end
