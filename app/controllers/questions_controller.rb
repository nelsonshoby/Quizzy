# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:create]
  before_action :load_question, only: [:show, :update, :destroy]

  def create
    question = @quiz.questions.new(question_params)
    puts question_params
    if question.save!
      render status: :ok, json: {
        notice: t("successfully_created", entity: "question")
      }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: {
        notice: t("successfully_destroyed", entity: "question")
      }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def show
    render
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: "successfully_updated", entity: "question" }
    else
      render status :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  private

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end

    def load_quiz
      @quiz = Quiz.find_by(id: question_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def question_params
      params.require(:question).permit(:description, :quiz_id, options_attributes: [:id, :content, :result, :_destroy])
    end
end
