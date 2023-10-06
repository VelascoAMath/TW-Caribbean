class CreateUserFiles < ActiveRecord::Migration[7.1]
  def change
    create_table :user_files do |t|
      t.string :name

      t.timestamps
    end
    add_index :user_files, :name, unique: true
  end
end
