class WorkspacesController < ApplicationController
  include Authenticatable

  def index
    render json: { workspaces: current_user.workspaces }
  end
end
