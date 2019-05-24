class BackfillTitleOnAudioDatum < ActiveRecord::Migration[5.2]
  def change
    audio_data_without_file = AudioDatum.where(file_upload_id: nil)
    audio_data_without_file.destroy_all
    audio_data = AudioDatum.where(title: nil)
    puts "AUDIO DATA WITH NIL TITLE: #{audio_data.count}"
    audio_data.each do |ad|
      puts "updating: #{ad.id}"
      title = ad.display_name || "Test Name"
      ad.update!(title: title)
    end
    puts "AUDIO DATA WITH NIL TITLE: #{audio_data.count}"
  end
end
