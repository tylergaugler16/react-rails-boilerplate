class AddWorkspaceRefToWidgets < ActiveRecord::Migration[5.2]
  def change
    add_reference :widgets, :workspace, foreign_key: true
  end
end
