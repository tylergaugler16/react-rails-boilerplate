class AddFieldsToAudioWidget < ActiveRecord::Migration[5.2]
  def change
      add_column :audio_data, :theme, :string
      add_column :audio_data, :series, :string
  end
end
