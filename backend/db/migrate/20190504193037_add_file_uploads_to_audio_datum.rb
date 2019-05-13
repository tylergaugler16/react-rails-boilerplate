class AddFileUploadsToAudioDatum < ActiveRecord::Migration[5.2]
  def change
    add_reference :audio_data, :file_upload, foreign_key: true
  end
end
