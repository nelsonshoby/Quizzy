# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: [:export]
  def create
    @user = User.find_by(email: user_params[:email])
    unless @user
      @user = User.new(user_params)
      unless @user.save!
        render status: :not_found, json: { error: t("Error while creating user") }
      end
    end
  end

  def export
    job_id = ReportExportWorker.perform_async(@current_user.id)
    render json: {
      jid: job_id
    }
  end

  def export_status
    job_id = params[:job_id]
    job_status = Sidekiq::Status.get_all(job_id).symbolize_keys
    render json: {
      status: job_status[:status],
      percentage: job_status[:pct_complete]
    }
  end

  def export_download
    job_id = params[:job_id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    filename = "ReportData#{DateTime.now.strftime("%Y%m%d_%H%M%S")}.xlsx"
    send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end
end
