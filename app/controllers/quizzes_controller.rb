# frozen_string_literal: true

class QuizzesController < ApplicationController
  def create
    quiz = Quiz.new(task_params)
    if quiz.save!
      render status: :ok, json: { notice: "Quiz was successfully created" }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def task_params
      params.require(:quiz).permit(:name, :user_id)
    end
end
