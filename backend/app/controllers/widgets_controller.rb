class WidgetsController < ApplicationController
  skip_before_action :verify_authenticity_token # find out why i need this lol
  include Authenticatable
  include SafeParameters

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

  def update
    widget = Widget.find_by_id(params["id"])
    widget.update!(widget_params)
    render json: { widget: widget }
  rescue StandardError => e
    Rails.logger.warn("ERROR: in widgets_controller#update, #{e.message}")
    render json: {error: "Could not update widget"}
  end

  def create_data_for_widget
    puts "params: #{params}"
    widget = Widget.find_by_id(params["widget_id"])

    new_widget_data = widget.create_data_for_widget!(params)
    puts "new_widgetdata: #{new_widget_data}"
    render json: { widget_data: new_widget_data, widget: widget }
  rescue StandardError => e
    Rails.logger.warn("ERROR: in widgets_controller#create_data_for_widget, #{e.message}")
    render json: {error: "Could not create widget data"}
  end

  private

    def widget_params
      params.require(:widget).permit(:data_type, :header_text, :subheader_text, :primary_color, :secondary_color, :tertiary_color)
    end

end
