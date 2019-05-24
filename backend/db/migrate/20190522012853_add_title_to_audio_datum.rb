class AddTitleToAudioDatum < ActiveRecord::Migration[5.2]
  def change
      add_column :audio_data, :title, :string
  end
end
