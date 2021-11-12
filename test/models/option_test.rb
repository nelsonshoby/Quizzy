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
    @option = Option.create(
      content: "welcome",
      question_id: @question.id
    )
  end

  def test_option_valid
    assert @option.valid?
  end

  def test_option_content_should_not_be_blank
    @option.content = nil
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Content can't be blank"
 end
end
