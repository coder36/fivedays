import WeatherApp from './weather_app'
import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import moment from 'moment'
import ReactTestUtils from 'react-addons-test-utils'

describe( '<WeatherApp/>', () => {

   function entry(timestamp) {
      return({
        "dt": moment(timestamp).unix(),
        "main": { "temp": 13.32 },
        "weather": [{ "description": "light rain", "icon": "10n"}],
        "wind": { "speed": 10.3, "deg": 327 }
     })
   }

   const testData = {
      "city": { "name": "Newcastle" },
      "list": [ entry("2016-10-02 12:00"),
                entry("2016-10-03 12:00"),
                entry("2016-10-04 12:00"),
                entry("2016-10-04 15:00"),
                entry("2016-10-04 19:00")
               ]
   }

   const dom = mount(<WeatherApp ready={true} weather={testData}/>)

   it( 'displays the city name on the first pannel', () => {
      expect(dom.find("#sunday_2nd_october .city").length).toEqual(1)
      expect(dom.find("#monday_3rd_october .city").length).toEqual(0)
   })

   it( 'displays today on the first pannel', () => {
      expect(dom.find("#sunday_2nd_october .day").text()).toEqual("Today")
   })

   it( 'displays the day on the other panels', () => {
      expect(dom.find("#monday_3rd_october .day").text()).toEqual("Monday 3rd October")
   })

   it( 'groups weather entries by day', () => {
      expect(dom.find("#sunday_2nd_october .weatherRow").length).toEqual(1)
      expect(dom.find("#monday_3rd_october .weatherRow").length).toEqual(1)
      expect(dom.find("#tuesday_4th_october .weatherRow").length).toEqual(3)
   })



   describe( 'panel', () => {

      const testData = {
         "city": { "name": "Newcastle" },
         "list": [
           {
             "dt": 1475344800,
             "main": { "temp": 13.32 },
             "weather": [{ "description": "light rain", "icon": "10n"}],
             "wind": { "speed": 10.3, "deg": 327 }
           }
         ]
      }

      const dom = mount(<WeatherApp ready={true} weather={testData}/>)

      it('displays the city name', () => {
         expect(dom.find( ".city").text()).toEqual("Newcastle")
      })

      it('displays a timestamp', () => {
         expect(dom.find( ".timestamp").text()).toEqual("19:00")
      })

      it('displays an icon to help visualise the weather', () => {
         expect(dom.find( ".icon img").props().src).toMatch(/10n\.png/)
      })

      it('displays a tooltip when hovering over the weather icon', () => {
         expect(dom.find( ".icon img").props().title).toEqual("light rain")
      })


      it('displays the temperature, rounding to the nearest whole number', () => {
         expect(dom.find( ".temp").text()).toEqual("13°C")
      })

      it('displays the windspeed rounding to the nearest whole number and converting to mph', () => {
         expect(dom.find( ".windspeed").text()).toEqual("6 mph")
      })

      it('displays the wind direction as a tooltip when hovering over the wind arrow icon', () => {
         expect(dom.find( ".windspeed img").props().title).toEqual("327°")
      })

      it('rotates the wind arrow icon to visualise the wind direction', () => {
         expect(dom.find( ".windspeed img").props().style.transform).toMatch(/327deg/)
      })
   })

})
