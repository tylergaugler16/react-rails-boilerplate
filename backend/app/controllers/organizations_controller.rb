class OrganizationsController < ApplicationController
  include Authenticatable

  def index
    render json: { organizations: current_user.organizations }
  end
end
