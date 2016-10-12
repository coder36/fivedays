require 'capybara'
require 'capybara/cucumber'
require 'capybara/rspec'
require 'mirage/client'
require 'capybara/poltergeist'
require 'phantomjs'
require 'pry'

Mirage.start

at_exit do
  Mirage.stop
end

if ENV['browser'] == "phantom"

  Capybara.register_driver :poltergeist do |app|
    options = {
       js_errors: false, # silences js errors
       timeout: 500, # adjusts timeout in ms
    }
    Capybara::Poltergeist::Driver.new(app, options)
  end

  Capybara.default_driver = :poltergeist

else

  Capybara.register_driver :selenium do |app|
    Capybara::Selenium::Driver.new(app, :browser => :chrome)
  end
  Capybara.default_driver = :selenium
end


Before('@smartphone') do
  set_window_size 400, 2000
end

After('@smartphone') do
  set_window_size 900, 900
end


def set_window_size(width, height)
  if Capybara.default_driver == :poltergeist
    page.driver.resize(width, height)
  else
    window = Capybara.current_session.driver.browser.manage.window
    window.resize_to(width, height)
  end
end


