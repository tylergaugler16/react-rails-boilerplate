class Widget < ApplicationRecord
  has_many :widget_data
  # has_many :widget_datable, through: :widget_data, source: :widget_datable, source_type: "WidgetDatable"

  has_many :audio_data, through: :widget_data, source: :widget_datable, source_type: "AudioDatum"

  def data
    if data_type == "Audio"
      audio_data
    end
  end

end
