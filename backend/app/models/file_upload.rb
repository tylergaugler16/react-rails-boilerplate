class FileUpload < ApplicationRecord
  include StorageUploader::Attachment.new(:detail)
  has_one :audio_datum

  def display_name
    detail.original_filename
  end

  def s3_bucket
    detail.storage.bucket
  end

  def download_url
    detail.storage.url(s3_id, download: true, expires_in: 1.hour.to_i)
  end

  def s3_id
    detail.id
  end

  def file_size
    detail.metadata["size"]
  end

end
