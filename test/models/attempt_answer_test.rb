# frozen_string_literal: true

require "test_helper"
class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "sam@email.com",
      first_name: "Sam",
      last_name: "Smith",
      password: "welcome",
      password_confirmation: "welcome",
      role: "administrator"
      )
    @quiz = @user.quizzes.create(name: "nelson")
    @question = @quiz.questions.create(
      description: "Question 1",
      options_attributes: [{ content: "1", result: true }, { content: "2", result: false }]
    )
    option1 = @question.options.first
    option2 = @question.options.last
    standard_user = User.create(
      email: "sam@email.com",
      first_name: "Sam",
      last_name: "Smith",
      password: "welcome",
      password_confirmation: "welcome"
      )
    @attempt = standard_user.attempts.new(quiz_id: @quiz.id)
    @attempt_answer = @attempt.attempt_answers.new(option_id: option1.id, question_id: @question.id)
  end

  def test_attempt_answer_is_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_option
    @attempt_answer.option = nil
    assert @attempt_answer.invalid?
  end

  def test_attempt_answer_should_not_be_valid_without_attempt
    @attempt_answer.attempt = nil
    assert @attempt_answer.invalid?
  end

  def test_attempt_answer_should_not_be_valid_without_question
    @attempt_answer.question = nil
    assert @attempt_answer.invalid?
  end
end
