# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email])
    unless @user
      @user = User.new(user_params)
      unless @user.save!
        render status: :not_found, json: { error: t("Error while creating user") }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end
end
