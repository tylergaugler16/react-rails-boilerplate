class AddNonNullableToAudioDatumTitle < ActiveRecord::Migration[5.2]
  def change
    change_column :audio_data, :title, :string, null: false
  end
end
