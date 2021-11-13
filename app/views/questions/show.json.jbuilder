# frozen_string_literal: true

json.question do
  json.extract! @question, :description, :quiz_id
  json.quiz @question.quiz.name
  json.options @question.options do |option|
    json.extract! option, :id, :content, :result
  end
end
