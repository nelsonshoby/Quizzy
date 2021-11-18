# frozen_string_literal: true

class AddCorrectAnswersCountToAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    add_column :attempt_answers, :correct_answers_count, :integer
  end
end
