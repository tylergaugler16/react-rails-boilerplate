class AudioDatum < ApplicationRecord
  has_many :widget_data, as: :widget_datable
end
