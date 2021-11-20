# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: [:create, :index, :update, :destroy, :show, :index]
    resources :questions, only: [:create, :destroy, :show, :update]
    resources :users, only: [:create]
    resources :attempts, only: [:create, :update, :show, :index]
  end
  get "quizzes/setSlug/:id", to: "quizzes#set_slug"
  get "quizzes/showSlug/:slug", to: "quizzes#show_slug"

  get "/export" => "users#export"
  get "/export_status/:job_id", to: "users#export_status"
  get "/export_download/:job_id", to: "users#export_download"

  root "home#index"
  get "*path", to: "home#index", via: :all

end
