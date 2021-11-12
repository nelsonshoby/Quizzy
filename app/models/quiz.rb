# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions
  validates :name, presence: true
end
