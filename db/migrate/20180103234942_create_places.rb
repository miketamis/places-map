class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.string :name, default: '', null: false
      t.string :description, default: '', null: false
      t.timestamps
    end
  end
end
