# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers
  accepts_nested_attributes_for :attempt_answers
end
