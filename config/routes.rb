#TODO: Why does `$ rails routes` return so many results?

Rails.application.routes.draw do
  root 'app#index' #TODO: probs dont need this

  resources :places do
    resources :places
  end

  get '*other', to: 'app#index'
end
