# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  validates :name, presence: true
  validates :slug, uniqueness: { allow_nil: true }
end
