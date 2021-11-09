# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  def index
    @quiz = policy_scope(Quiz)
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

  def update
    puts params[:id]
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
    puts @quiz
    puts params[:id]
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

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
