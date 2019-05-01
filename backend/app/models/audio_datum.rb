class AudioDatum < ApplicationRecord
  has_many :widget_data, as: :widget_datable
  # MP3, M4A, AAC, OGA validate these extensions
  self.per_page = 5
  # has_many :themes
  def as_json(_options = {})
    super(only: [:theme, :series, :id, :file_name, :s3_object_url, :file_size, :speaker])
  end

  def destroy_aws_file
    aws = AwsService.new
    objects = aws.bucket.objects.prefix("#{user_id}/") # need to actually get the user_id here
    objects.each do |obj|
      if(obj.key === file_name)
        obj.delete
        return
      end
    end
  end
end
