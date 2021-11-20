# frozen_string_literal: true

class ReportExportWorker
  include Sidekiq::Worker

  include Sidekiq::Status::Worker

  def perform(user_id)
    user = User.find_by(id: user_id)

    users = []
    user.quizzes.each do |quiz|
      attempt_details = []
      quiz.attempts.where(submitted: true).each do |attempt|
        user_name = "#{attempt.user.first_name} #{attempt.user.last_name}"
        quiz_name = attempt.quiz.name
        user_email = attempt.user.email
        correct = attempt.correct_answers_count
        incorrect = attempt.incorrect_answers_count
        attempt_details << quiz_name << user_name << user_email << correct << incorrect
      end
      users << attempt_details

    end

    attempts = users.compact_blank

    xlsx_package = Axlsx::Package.new

    xlsx_workbook = xlsx_package.workbook

    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|

      worksheet.add_row %w(Quiz\ Name User\ Name Email Correct\ Answer Incorrect\ Answer)

      attempts.each.with_index(1) do |attempt, idx|

        worksheet.add_row attempt

        at idx

        sleep 0.5
      end
    end

    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
  end
end
