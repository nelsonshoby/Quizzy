# frozen_string_literal: true

class AddDefaultToResult < ActiveRecord::Migration[6.1]
  def change
    change_column_default :options, :result, false
  end
end
