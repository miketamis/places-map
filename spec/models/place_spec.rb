require 'rails_helper'

RSpec.describe Place, type: :model do
  it { should validate_presence_of(:name) }
  # TODO: is this a complete test?
end
