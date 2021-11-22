# frozen_string_literal: true

require "test_helper"
class OptionTest < ActiveSupport::TestCase
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

    @question = Question.create(
      description: "First question",
      quiz_id: @quiz.id
    )
    @option1 = @question.options.new(
      content: "welcome",
      question_id: @question.id
    )
    @option2 = @question.options.new(
      content: "welcome",
      question_id: @question.id
    )
  end

  def test_option_valid
    assert @option1.valid?
    assert @option2.valid?
  end

  def test_option_content_should_not_be_blank
    @option1.content = nil
    @option2.content = nil
    assert_not @option1.valid?
    assert_not @option2.valid?
    assert_includes @option1.errors.full_messages, "Content can't be blank"
    assert_includes @option2.errors.full_messages, "Content can't be blank"
 end

  def test_option_should_not_be_valid_without_question
    @option1.question = nil
    @option2.question = nil
    assert_not @option1.valid?
    assert_not @option2.valid?
    assert_includes @option1.errors.full_messages, "Question must exist"
    assert_includes @option2.errors.full_messages, "Question must exist"
 end
end
