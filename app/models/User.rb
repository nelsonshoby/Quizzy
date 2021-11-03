# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  enum role: { standard: 0, administrator: 1 }
  has_secure_password
  has_secure_token :authentication_token

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, :last_name, presence: true, length: { maximum: Constants::MAX_USERNAME_LENGTH }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :to_lower_case

  private

    def to_lower_case
      email.downcase!
    end
end
