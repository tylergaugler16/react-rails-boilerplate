class GreetingsController < ApiController
  def hello
    render json: { content: 'Hello from Rails' }
  end

  def testing_greeting
    user = User.first
    greeting = "Hello #{user.first_name}!"
    render json: { content: greeting }
  end
end
