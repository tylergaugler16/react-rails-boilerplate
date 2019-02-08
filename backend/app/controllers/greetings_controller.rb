class GreetingsController < ApplicationController
  def hello
    render json: { content: 'Hello from Rails' }
  end

  def testing_greeting
    render json: { content: 'Hello from DOCKER!' }
  end
end
