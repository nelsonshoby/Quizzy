# frozen_string_literal: true

json.attempt @attempt.id
json.notice t("successfully_submitted", entity: "Answer")
