# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  validates :description, presence: true

  validates_associated :options
end
