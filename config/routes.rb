# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :home, only: :index
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: [:create, :index, :update, :destroy, :show]
    resources :questions, only: [:create, :destroy]
  end
  root "home#index"
  get "*path", to: "home#index", via: :all

end
