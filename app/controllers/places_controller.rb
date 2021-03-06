class PlacesController < ApplicationController
  before_action :set_place, only: %i[show update destroy]

  # GET /places
  def index
    @places = Place.all
    json_response(@places)
  end

  # POST /places
  def create
    @place = Place.create!(place_params)
    json_response(@place, :created)
  end

  # GET /places/:id
  def show
    json_response(@place)
  end

  # PUT /places/:id
  def update
    @place.update(place_params)
    head :no_content
  end

  # DELETE /places/:id
  def destroy
    @place.destroy
    head :no_content
  end

  private

  def place_params
    # whitelist params
    params.permit(:name, :description, :lat, :lng)
  end

  def set_place
    @place = Place.find(params[:id])
  end
end
