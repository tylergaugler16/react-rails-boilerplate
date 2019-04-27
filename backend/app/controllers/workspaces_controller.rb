class WorkspacesController < ApplicationController
  include Authenticatable

  def index
    render json: { workspaces: current_user.workspaces }
  end

  def show
    workspace_id = params["workspace_id"]
    render json: {workspace: nil} unless workspace_id
    workspace = Workspace.find_by_id(workspace_id)
    # need to check if current_user can view this specific workspace
    render json: { workspace: workspace }
  end
end