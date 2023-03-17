# frozen_string_literal: true

# It provides a simple and flexible way to create and send emails
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
