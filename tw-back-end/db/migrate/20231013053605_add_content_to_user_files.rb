class AddContentToUserFiles < ActiveRecord::Migration[7.1]
  def change
    add_column :user_files, :content, :text
  end
end
