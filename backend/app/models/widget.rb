class Widget < ApplicationRecord
  belongs_to :workspace
  has_many :widget_data
  has_many :audio_data, through: :widget_data, source: :widget_datable, source_type: "AudioDatum"

  def data
    if data_type == "Audio"
      audio_data
    elsif data_type == "Video"
      # 
    end
  end

  def add_data(new_record)
    if data_type == "Audio"
      audio_data << new_record
    end
  end

end
