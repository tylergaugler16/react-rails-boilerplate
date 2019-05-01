class Workspace < ApplicationRecord
  has_many :workspace_memberships
  has_many :users, through: :workspace_memberships
  has_many :widgets
  belongs_to :owner, class_name: :User

  DATA_TYPES = ['Audio', 'Video'].freeze
  def as_json(_options = {})
    super(only: [:name, :id],
          methods: [:available_widget_types],
          include: {
            widgets: { only: [:data_type, :id] }
          }
        )
  end

  def available_widget_types
    used_types = widgets.pluck(:data_type).uniq
    Workspace::DATA_TYPES - used_types
  end

  def out_of_storage_space?
    owner&.total_size_of_uploaded_files[:bytes] > 5497558138880 # 5GB
  end

end
