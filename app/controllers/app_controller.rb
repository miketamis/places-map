require 'rails/application_controller'

class AppController < ActionController::Base
  def index
    render 'app/index'
  end
end
