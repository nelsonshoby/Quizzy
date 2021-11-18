# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_attempt, only: [:update, :show]

  def create
    @attempt = Attempt.find_by(quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id])

    unless @attempt

      @attempt = Attempt.new(attempt_params)

      unless @attempt.save

        render status: :unprocessable_entity,
          json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
    if @attempt.submitted
      render status: :unprocessable_entity, json: { error: "You have already submitted this quiz" }
    else
      render status: :ok, json: { attempt_id: @attempt.id }
    end
  end

  def update
    unless @attempt.update(attempt_params)
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages }
    end
  end

  def show
    load_attempt
    @quiz = Quiz.find_by(id: @attempt.quiz_id)
    render
  end

  private

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end

    def attempt_params
      params.require(:attempt).permit(
        :user_id, :quiz_id, :submitted,
        attempt_answers_attributes: [:question_id, :option_id])
    end
end
