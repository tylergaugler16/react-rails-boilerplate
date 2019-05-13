class AwsService
  attr_reader :s3
  CREDENTIALS = {
    access_key_id: "AKIAZZCMSHDFJMGOW4PN",
    secret_access_key: "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"
  }
  def initialize
    @s3 = Aws::S3::Resource.new(CREDENTIALS)
  end

  def bucket
    bucket_name = Rails.env.production? ? "widgetly-prod" : "widgetly-dev"
    @s3.bucket(bucket_name)
  end

  def self.bucket_name
    Rails.env.production? ? "widgetly-prod" : "widgetly-dev"
  end

  def all_object_keys
    bucket.objects.collect(&:key)
  end
  
end
