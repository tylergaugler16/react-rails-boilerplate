class ApplicationController < ActionController::Base

  protected
    def render_errors(errors, status)
      render json: { errors: Array(errors) }, status: status
    end

    # UNPROCESSABLE ENTITY
    def render_422(errors)
      render_errors(errors, 422)
    end

    # PERMISSION DENIED
    def render_403(errors)
      render_errors(errors, 422)
    end
end
