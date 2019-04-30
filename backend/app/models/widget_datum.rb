class WidgetDatum < ApplicationRecord
  belongs_to :widget
  belongs_to :widget_datable, polymorphic: true

  self.per_page = 1

end
