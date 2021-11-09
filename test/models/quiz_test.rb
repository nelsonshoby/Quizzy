# frozen_string_literal: true

require "test_helper"
class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "sam@email.com",
      first_name: "Sam",
      last_name: "Smith",
      password: "welcome",
      password_confirmation: "welcome"
      )
    @quiz = Quiz.new(
      name: "Hai",
      user_id: @user.id
     )
  end

  def test_quiz_valid
    assert @quiz.valid?
  end

  def test_quiz_name_should_not_be_blank
    @quiz.name = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Name can't be blank"
 end

  def test_quiz_user_id_should_not_be_blank
    @quiz.user_id = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "User must exist"
  end

  def test_quiz_count_increases_on_saving
    assert_difference ["Quiz.count"] do
      @quiz.save
    end
  end

  def test_quiz_count_decreases_on_deleting
    @quiz.save
    assert_difference ["Quiz.count"], -1 do
      @quiz.delete
    end
  end
end
