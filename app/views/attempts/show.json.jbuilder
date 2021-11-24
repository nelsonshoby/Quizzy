# frozen_string_literal: true

json.attempt do
  json.answers @attempt.attempt_answers do |answer|
    json.user answer.attempt.user.email
    json.extract! answer, :question_id, :option_id
  end
end

json.quiz do
  json.questions @quiz.questions do |question|

    json.extract! question, :id
    json.options question.options.where(result: true) do |option|
      json.extract! option, :content, :result, :id
    end
  end
end
