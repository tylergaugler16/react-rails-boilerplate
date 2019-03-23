# class Post
#   has_many :attachments, as: :parent
# end
#
# class Image
#   belongs_to :parent, polymorphic: true
# end
#
# And in migrations:
#
# create_table :images do |t|
#   t.references :post, polymorphic: true
# end
#

#  themes shoule be Post, and everyhting that has a theme should be image

# https://stackblitz.com/edit/react-select-custom-tag-edit-new
# ^ that's how i'll add the input on the frontend
