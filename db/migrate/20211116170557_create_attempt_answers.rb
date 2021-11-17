# frozen_string_literal: true

class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.references :question, null: false, foreign_key: true
      t.references :attempt, null: false, foreign_key: true
      t.references :option, null: false, foreign_key: true
      t.timestamps
    end
  end
end
