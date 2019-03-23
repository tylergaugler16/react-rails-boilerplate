class Widget < ApplicationRecord
  belongs_to :workspace
  has_many :widget_data
  has_many :audio_data, through: :widget_data, source: :widget_datable, source_type: "AudioDatum"

  validates :data_type, presence: true

  def as_json(_options = {})
    super(only:
      [:primary_color, :secondary_color, :tertiary_color, :id, :subheader_text, :header_text, :data_type, :workspace_id],
          methods: [:data],
    )
  end

  def data
    if data_type == "Audio"
      audio_data
    elsif data_type == "Video"
      #
    end
  end

  def add_data_to_widget(new_data_record)
    case data_type
    when "Audio"
      audio_data << new_data_record
    when "Video"
    when "OtherDataTypes"
    else
      return
    end
  end

  def create_data_for_widget!(params)
    puts "params in model: #{params}"
    puts "safe params: #{SafeParameters.widget_data_params(data_type, params)}"
    new_widget_data = widget_data_class.create!(SafeParameters.widget_data_params(data_type, params))
    add_data_to_widget(new_widget_data)
    new_widget_data
  end

  def widget_data_class
    Kernel.const_get(widget_data_class_name)
  end

  def widget_data_class_name
    case data_type
    when "Audio"
      "AudioDatum"
    else
    end

  end

end
