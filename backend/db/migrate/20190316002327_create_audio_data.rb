class CreateAudioData < ActiveRecord::Migration[5.2]
  def change
    create_table :audio_data do |t|
      t.string :speaker
      t.timestamps
    end
  end
end
