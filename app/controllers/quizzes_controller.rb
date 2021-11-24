# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:show_slug, :show_slug_header]
  before_action :load_quiz, only: [:show, :set_slug]

  def index
    @quiz = policy_scope(Quiz).order("created_at DESC")
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    authorize quiz
    if quiz.save!
      render status: :ok, json: {
        notice: t("successfully_created", entity: "quiz")
      }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    render
  end

  def update
    @quiz = Quiz.find_by(id: params[:id])
    authorize @quiz
    if @quiz.update(quiz_params)
      render status: :ok, json: {
        notice: t("successfully_updated", entity: "quiz")
      }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    @quiz = Quiz.find_by(id: params[:id])
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: {
        notice: t("successfully_destroyed", entity: "quiz")
      }

    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def set_slug
    name_slug = @quiz.name.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_task_slug = Quiz.where(
      regex_pattern,
      "^#{name_slug}$|^#{name_slug}-[0-9]+$"
    ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
    slug_count = 0
    if latest_task_slug.present?
      slug_count = latest_task_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
    unless @quiz.update(slug: slug)
      render status: :not_found, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show_slug
    @quiz = Quiz.find_by(slug: params[:slug])
    unless @quiz
      render status: :not_found, json: { error: t("quiz_does_not_exist") }
    end
  end

  def show_slug_header
    @quiz = Quiz.find_by(slug: params[:slug])
    unless @quiz
      render status: :not_found, json: { error: t("quiz_does_not_exist") }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("error_while_creating_slug") }
      end
    end

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
