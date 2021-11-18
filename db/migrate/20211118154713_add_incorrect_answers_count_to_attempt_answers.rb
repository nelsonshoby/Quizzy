# frozen_string_literal: true

class AddIncorrectAnswersCountToAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    add_column :attempt_answers, :incorrect_answers_count, :integer
  end
end
