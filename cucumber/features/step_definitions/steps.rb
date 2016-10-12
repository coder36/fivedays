require 'json'
require 'date'

def date str
  DateTime.parse(str).to_time.to_i
end

def to_snake str
  str.gsub(" ", "_").downcase
end

def mock_api_with json
  mirage = Mirage::Client.new.put('/api') do
    http_method :get; status 200; content_type 'application/json'; headers({"Access-Control-Allow-Origin": "*"})
    body json.to_json
  end 
end

Then(/^the first panel should contain:$/) do |table|
  table.raw.flatten.each { |r| expect(page).to have_content(r) }
end

And(/^I wait$/) do
  sleep 10000
end

Given(/^the openweathermap API returns:$/) do |table|
  json = eval table.raw.flatten.join( " ")
  mock_api_with json
end

When(/^I am viewing the weather app$/) do
  visit "http://localhost:3000"
end

Then(/^the 1st panel should contain:$/) do |table|
  table.raw.flatten.each { |r| expect(page).to have_content(r) }
end

Then(/^the "(.*)" panel should contain:$/) do |panel_id, table|
  panel = find(:id, to_snake(panel_id)).text
  check_content_for( panel, table )
end

def check_content_for content, cucumber_table
  pos = 0
  cucumber_table.raw.flatten.each do |r|
    expect(content).to have_content(r)
    pos = content.index(r)
    content = content[(pos + r.length)..-1]
  end
end