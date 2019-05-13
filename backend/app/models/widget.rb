class Widget < ApplicationRecord
  belongs_to :workspace
  has_many :widget_data
  has_many :audio_data, through: :widget_data, source: :widget_datable, source_type: "AudioDatum"

  validates :data_type, presence: true

  def as_json(_options = nil)
    return super(_options) if _options
    super(
      {
        only:
        [:primary_color, :secondary_color, :tertiary_color, :id, :subheader_text, :header_text, :data_type, :workspace_id]
      }
    )
  end

  def data
    if data_type == "Audio"
      audio_data
    elsif data_type == "Video"
      #
    end
  end

  def add_datum_to_widget(new_data_record)
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
    file_details = params.delete(:file_upload)
    file_upload = FileUpload.new
    file_upload.detail = file_details[:data].to_json
    file_upload.save!
    puts "HEYY: #{file_upload.errors.inspect}"
    # return error if no file_details are given
    params[:file_upload_id] = file_upload.id
    new_widget_datum = widget_data_class.create!(SafeParameters.widget_data_params(data_type, params))
    add_datum_to_widget(new_widget_datum)
    new_widget_datum
  end

  def widget_data_class
    Kernel.const_get(widget_datum_class_name)
  end

  def widget_datum_class_name
    case data_type
    when "Audio"
      "AudioDatum"
    else
    end
  end

  def is_part_of?(workspace)
    return false unless workspace
    workspace_id == workspace.id
  end

end
