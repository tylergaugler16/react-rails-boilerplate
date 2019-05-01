class AudioDatum < ApplicationRecord
  has_many :widget_data, as: :widget_datable
  self.per_page = 1
  # has_many :themes
  def as_json(_options = {})
    super(only: [:theme, :series, :id, :file_name, :s3_object_url])
  end
end
