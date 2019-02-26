class ApiController < ApplicationController
  include Authenticatable
  before_action :authenticate
end
