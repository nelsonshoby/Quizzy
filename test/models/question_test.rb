# frozen_string_literal: true

require "test_helper"
class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "sam@email.com",
      first_name: "Sam",
      last_name: "Smith",
      password: "welcome",
      password_confirmation: "welcome"
      )

    @quiz = Quiz.create(
      name: "Hai",
      user_id: @user.id
    )

    @question = Question.new(
      description: "First question",
      quiz_id: @quiz.id
    )
  end

  def test_question_valid
    assert @question.valid?
  end

  def test_question_description_should_not_be_blank
    @question.description = nil
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Description can't be blank"
 end

  def test_question_quiz_id_should_not_be_blank
    @question.quiz_id = nil
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Quiz must exist"
  end
end
