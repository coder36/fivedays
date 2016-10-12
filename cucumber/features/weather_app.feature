Feature: Weather App
  As smartphone user I want to be able to check a 5 day weather forecast on my smartphone, so that I can plan
  my outdoor actvities.  The app should display weather metrics in easily readable way, rounded to the nearest
  whole number.

  Background:
    Given the openweathermap API returns:
      | {                                                                 |
      |   "city": { "name": "Newcastle" },                                |
      |   "list": [                                                       |
      |     {                                                             |
      |       "dt": date('December 09, 2016, 21:00'),                     |
      |       "main": { "temp": 13.32 },                                  |
      |       "weather": [{ "description": "light rain", "icon": "10n"}], |
      |       "wind": { "speed": 10.3, "deg": 327 }                       |
      |     },                                                            |
      |     {                                                             |
      |       "dt": date('December 10, 2016, 18:00'),                     |
      |       "main": { "temp": 13.32 },                                  |
      |       "weather": [{ "description": "light rain", "icon": "10n"}], |
      |       "wind": { "speed": 10.3, "deg": 327 }                       |
      |     },                                                            |
      |     {                                                             |
      |       "dt": date('December 10, 2016, 21:00'),                     |
      |       "main": { "temp": 11.01 },                                  |
      |       "weather": [{ "description": "light rain", "icon": "10n"}], |
      |       "wind": { "speed": 10.3, "deg": 327 }                       |
      |     }                                                             |
      |   ]                                                               |
      | }                                                                 |

  @smartphone
  Scenario: I've opened the app on my mobile
    When I am viewing the weather app
    Then the "Friday 9th December" panel should contain:
      | Newcastle |           |           |
      | Today     |           |           |
      | 21:00     | 13°C      | 6 mph     |

    And the "Saturday 10th December" panel should contain:
      | Saturday 10th December   |          |           |
      | 18:00                    |   13°C   | 6 mph     |
      | 21:00                    |   11°C   | 6 mph     |
