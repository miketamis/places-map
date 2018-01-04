FactoryGirl.define do
  factory :place do
    name { Faker::Hobbit.location }
    description { Faker::Lorem.paragraph }
  end
end
