class WidgetDatum < ApplicationRecord
  belongs_to :widget_data, as: :widget_datable
  belongs_to :widget

end
