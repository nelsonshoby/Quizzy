# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: [:create, :index, :update, :destroy, :show]
    resources :questions, only: [:create, :destroy, :show, :update]
  end
  get "quizzes/setSlug/:id", to: "quizzes#set_slug"
  get "quizzes/showSlug/:slug", to: "quizzes#show_slug"
  root "home#index"
  get "*path", to: "home#index", via: :all

end
