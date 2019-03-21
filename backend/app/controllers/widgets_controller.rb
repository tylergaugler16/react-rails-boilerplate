class WidgetsController < ApplicationController
  skip_before_action :verify_authenticity_token # find out why i need this lol
  include Authenticatable

  def index
    workspace_id = params["workspace_id"]
    render json: { widgets: "yo" }
  end

  def show
    id = params["widget_id"]
    widget = Widget.find_by_id(id)
    render json: {widget: widget}
  end

  def create
    workspace = Workspace.find_by_id(params["workspace_id"])
    render json: {error: "Could not create widget"} if workspace.nil?
    new_widget = workspace.widgets.create!(widget_params)

    render json: { widget: new_widget }
  rescue StandardError => e
    Rails.logger.warn("ERROR: in widgets_controller#create, #{e.message}")
    render json: {error: "Could not create widget"}
  end

  private

    def widget_params
      params.require(:widget).permit(:data_type, :header_text, :subheader_text, :primary_color, :secondary_color, :tertiary_color)
    end

end
