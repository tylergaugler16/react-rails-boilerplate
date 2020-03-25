class GreetingsController < ApiController
  def hello
    render json: { content: 'Hello from Rails' }
  end
end
