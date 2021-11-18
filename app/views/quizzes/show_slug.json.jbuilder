# frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :id, :name
  json.questions @quiz.questions do |question|
    json.extract! question, :description, :id
    json.options question.options do |option|
      json.extract! option, :content, :id
    end
  end
end
