# frozen_string_literal: true

json.attempt do
  json.quiz @quizzes do |quiz|
    json.report quiz.attempts.where(submitted: true) do |attempt|
      json.correct attempt.correct_answers_count
      json.incorrect attempt.incorrect_answers_count
      json.name quiz.name
      json.email attempt.user.email
      json.user_name "#{attempt.user.first_name} #{attempt.user.last_name}"
    end
  end
end
