class Widget < ApplicationRecord
  has_many :widget_data
  has_many :widget_data, through: :widget_data
end
