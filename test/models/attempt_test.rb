# frozen_string_literal: true

require "test_helper"
class AttemptTest < ActiveSupport::TestCase
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
    standard_user = User.create(
      email: "sam@email.com",
      first_name: "Sam",
      last_name: "Smith",
      password: "welcome",
      password_confirmation: "welcome"
      )
    @attempt = standard_user.attempts.new(quiz_id: @quiz.id)
  end

  def test_attempt_is_valid
    assert @attempt.valid?
  end

  def test_attempt_submitted_has_default_false
    assert_equal @attempt.submitted, false
  end

  def test_attempt_should_not_be_valid_without_quiz
    @attempt.quiz = nil
    assert @attempt.invalid?
  end
end
