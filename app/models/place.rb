class Place < ApplicationRecord
  validates_presence_of :name
  acts_as_mappable
end
