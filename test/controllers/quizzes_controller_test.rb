# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
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
    @user_headers = headers(@user)
  end

  def test_should_list_all_quiz_for_valid_user
    get quizzes_path, headers: @user_headers
    assert_response :success
    response_body = response.parsed_body
    assert_equal response_body.length, @user.quizzes.count
  end

  def test_should_create_valid_quiz
    post quizzes_path,
      params: { quiz: { name: "Learn Ruby" } },
      headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "quiz")
  end

  def test_valid_user_can_update_quiz_title
    new_title = "#{@quiz.name}-(updated)"
    quiz_params = { quiz: { name: new_title, user_id: @user.id }, id: @quiz.id }
    put quizzes_path + "/" + @quiz.id.to_s, params: quiz_params, headers: @user_headers
    assert_response :success
    @quiz.reload
    assert_equal @quiz.name, new_title
    assert_equal @quiz.user_id, @user.id
  end
end
