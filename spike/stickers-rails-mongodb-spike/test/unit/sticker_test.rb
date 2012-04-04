require 'test_helper'

class StickerTest < ActiveSupport::TestCase
  test "new sticker" do
    Sticker.destroy_all
    assert_equal(Sticker.count, 0)
    assert_difference "Sticker.count", 1 do
      Sticker.create(:title=>'#123', 
                      :content=>'task list of story #123',
                      :tags=> [Tag.new(:name=>'story'), Tag.new(:name=>'tasking')])
    end
    sticker = Sticker.last
    assert_equal(sticker.title, '#123')
    assert_equal(sticker.content, 'task list of story #123')
    assert_equal(sticker.tags.count, 2)
  end
  
  test "find sticker by tag" do
    Sticker.destroy_all
    Sticker.create(:title=>'#123', 
                    :content=>'task list of story #123',
                    :tags=> [Tag.new(:name=>'story'), Tag.new(:name=>'tasking')])
    Sticker.create(:title=>'#456', 
                    :content=>'task list of defect #456',
                    :tags=> [Tag.new(:name=>'defect'), Tag.new(:name=>'tasking')])

    taskingTag = Tag.find_by_name('tasking')
    assert_equal(taskingTag.name, 'tasking')
  end
end
