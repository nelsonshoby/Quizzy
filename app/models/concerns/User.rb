# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, :last_name, presence: true, length: { maximum: Constants::MAX_USERNAME_LENGTH }

  before_save :to_lower_case

  private

    def to_lower_case
      email.downcase!
    end
end
