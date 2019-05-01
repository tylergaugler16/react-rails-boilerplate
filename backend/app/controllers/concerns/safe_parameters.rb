module SafeParameters
  def widget_data_params(type, params)
    case type
    when "Audio"
      AudioDatumSafeParams.safe_params(params)
    end

  end
  module_function :widget_data_params

private
  class AudioDatumSafeParams
    def self.safe_params(params)
      params.permit(:speaker, :theme, :series, :s3_object_url, :file_name, :file_size)
    end

  end

end
