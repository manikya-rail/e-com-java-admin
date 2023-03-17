# frozen_string_literal: true

# It provides a number of features that are common to all models
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end
