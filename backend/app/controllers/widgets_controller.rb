class WidgetsController < ApplicationController
  include Authenticatable
  include SafeParameters

  before_action :check_for_widget_and_workspace, only: [:show, :get_widget_data]

  def index
    workspace_id = params["workspace_id"]
    render json: { widgets: "yo" }
  end

  def show
    render json: { widget: @widget }
  end

  def get_widget_data
    data = @widget.data
    page = params[:page] || 1
    per_page = @widget.widget_data_class.per_page
    total_pages = (data.count / per_page.to_f).ceil
    # can do additional ordering here
    render json: {
      widget_data: data.paginate(page: page),
      current_page: page.to_i,
      total_pages: total_pages.to_i
    }
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
    params.delete(:widget_id)
    params.delete(:widget)
    new_widget_data = widget.create_data_for_widget!(params)

    puts "new_widgetdata: #{new_widget_data}"
    render json: { widget_data: new_widget_data, widget: widget }
  rescue StandardError => e
    Rails.logger.warn("ERROR: in widgets_controller#create_data_for_widget, #{e.message}")
    render json: {error: "Could not create widget data"}
  end

  private

    def check_for_widget_and_workspace
      widget_id = params[:widget_id]
      workspace_id = params[:workspace_id]
      render_422('Expected parameters were not given.') && return unless  widget_id && workspace_id
      @workspace = Workspace.find(workspace_id)
      render_403('You do not have permission to view this workspace.')  && return unless current_user.has_access_to?(@workspace)
      @widget = Widget.find(widget_id)
      render_403('You do not have permission to view this workspace.') && return unless @widget.is_part_of?(@workspace)
    end

    def widget_params
      params.require(:widget).permit(:data_type, :header_text, :subheader_text, :primary_color, :secondary_color, :tertiary_color)
    end

end
