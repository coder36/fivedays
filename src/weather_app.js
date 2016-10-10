import React from 'react'
import './weather_app.css'
import WeatherPanel from './weather_panel'
import moment from 'moment'
import Map from 'es6-map';


function groupWeatherByDay(list) {
  const days = new Map() // use Map as need we to maintain insertion order

  list.forEach( (w) => {
    const day = moment(w.dt*1000).format("dddd Do MMMM")
    if( !days[day] ) days[day] = []
    days[day].push(w)
  })

  return days;
}


export default function(props) {
  if( !props.ready ) return <h1>Loading</h1>
  const weather = props.weather
  const city = weather.city && weather.city.name
  const weatherRows = groupWeatherByDay( weather.list || [] )

  const weatherPanels = Object.keys(weatherRows).map( (day, index) => (
    <WeatherPanel key={day} today={index===0} day={day} city={city} weatherRows={weatherRows[day]}/>
  ));

  return (
    <main>
      {weatherPanels}
    </main>
  )
}

