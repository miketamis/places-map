#TODO: Why does `$ rails routes` return so many results?

Rails.application.routes.draw do
  resources :places do
    resources :places
  end
end
