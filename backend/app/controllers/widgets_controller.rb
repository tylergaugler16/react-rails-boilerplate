class WidgetsController < ApplicationController
  include Authenticatable

  def index
    puts "#{params.inspect}"
    workspace_id = params["workspace_id"]
    render json: { widgets: "yo" }
  end
end
