class UserFile < ApplicationRecord
    validates :name, presence: true, uniqueness: true
end
