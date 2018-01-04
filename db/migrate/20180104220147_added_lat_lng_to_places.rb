class AddedLatLngToPlaces < ActiveRecord::Migration[5.1]
  def change
    add_column :places, :lat, :decimal,
               precision: 15, scale: 10, null: false, default: -36
    add_column :places, :lng, :decimal,
               precision: 15, scale: 10, null: false, default: 174
  end
end
