class WidgetDatum < ApplicationRecord
  belongs_to :widget
  belongs_to :widget_datable, polymorphic: true

end
