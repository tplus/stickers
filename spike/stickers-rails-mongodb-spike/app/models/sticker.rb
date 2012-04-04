class Sticker
  include MongoMapper::Document
  
  key :title, String
  key :content, String
  key :x_position, Integer
  key :y_position, Integer
  key :tag_ids, Array
  many :tags, :in => :tag_ids
  
  validates_presence_of :title
  validates_presence_of :content
end
