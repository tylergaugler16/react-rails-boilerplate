module SafeParameters

  def example_params(params)
    params.permit(:field)
  end
end
