class AudioDatum < ApplicationRecord
  has_many :widget_data, as: :widget_datable
  before_destroy :destroy_aws_file #TODO needs to be tested
  # MP3, M4A, AAC, OGA validate these extensions
  self.per_page = 5
  # has_many :themes
  def as_json(_options = {})
    super(only: [:theme, :series, :id, :file_name, :s3_object_url, :file_size, :speaker])
  end

  def destroy_aws_file
    aws = AwsService.new
    # TODO this is brittle, should change to a regex or something
    s3_object_key = s3_object_url[38..-1]
    objects = aws.bucket.objects(prefix: s3_object_key) # need to actually get the user_id here
    # s3.bucket.objects(prefix: "1/610b66ef6498a6f08ed3524e58f61d95.mp3").collect(&:key)
    object = objects.first
    object.delete
  end
end
