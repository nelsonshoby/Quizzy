# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      email: "sam@email.com",
      first_name: "Sam",
      last_name: "Smith"
                     )
  end

  def test_user_valid
    assert @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_user_should_not_be_valid_and_saved_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 50
    assert @user.valid?
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = "a" * 50
    assert @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
    test_user = @user.dup
    assert_not test_user.valid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
      first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
      @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_email_should_not_valid_if_downcase_been_taken
    test_user = @user.dup
    test_user.email = "SAM@EMAIL.COM"
    test_user.save!
    assert_not @user.valid?
  end

  def test_user_should_have_valid_role
    valid_user = %w[standard administrator]
    valid_user.each do |role|
      @user.role = role
      assert @user.valid?
    end
  end
end
