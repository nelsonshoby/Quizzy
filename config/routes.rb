# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :home, only: :index
    resource :sessions, only: :create
  end
  root "home#index"
  get "*path", to: "home#index", via: :all

end
