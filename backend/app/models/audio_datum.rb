class AudioDatum < ApplicationRecord
  has_many :widget_data, as: :widget_datable

  # has_many :themes
  def as_json(_options = {})
    super(only: [:theme, :series, :id],
    )
  end
end
