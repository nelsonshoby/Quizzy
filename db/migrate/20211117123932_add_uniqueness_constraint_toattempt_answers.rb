# frozen_string_literal: true

class AddUniquenessConstraintToattemptAnswers < ActiveRecord::Migration[6.1]
  def change
    add_index :attempt_answers, [:attempt_id, :question_id], unique: true
  end
end
