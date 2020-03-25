# require "shrine"
# require "shrine/storage/s3"

# s3_options = {
#   access_key_id: "AKIAZZCMSHDFJMGOW4PN",
#   secret_access_key: "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",
#   bucket:            AwsService.bucket_name,
#   region: "us-east-1",
# }

# Shrine.storages = {
#   cache: Shrine::Storage::S3.new(prefix: "cache", **s3_options),
#   store: Shrine::Storage::S3.new(**s3_options),
# }

# Shrine.plugin :uppy_s3_multipart

# Shrine.plugin :activerecord, callbacks: false # or :activerecord


# Shrine.plugin :cached_attachment_data # for retaining the cached file across form redisplays
# Shrine.plugin :restore_cached_data # re-extract metadata when attaching a cached file
