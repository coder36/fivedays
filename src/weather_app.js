import React from 'react'
import 'whatwg-fetch'
import './weather_app.css'
import WeatherPanel from './weather_panel'
import moment from 'moment'
import Map from 'es6-map';

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {weather: props.data || {}}
    if ( !props.data) this.loadWeather()
  }

  loadWeather() {
    const url = process.env.REACT_APP_API ||  "http://api.openweathermap.org/data/2.5/forecast?APPID=019a736fd448ec0464f324f3f7063003&units=metric&q=Newcastle,uk&mode=json"
    fetch(url).then(resp => resp.json()).then((weather) => {
      this.setState({weather})
    })
  }

  groupWeatherByDay(list) {
    const days = new Map() // use Map as need we to maintain insertion order

    list.forEach( (w) => {
      const day = moment(w.dt*1000).format("dddd Do MMMM")
      if( !days[day] ) days[day] = []
      days[day].push(w)
    })

    return days;
  }

  render() {
    const weather = this.state.weather
    const city = weather.city && weather.city.name
    const weatherRows = this.groupWeatherByDay( weather.list || [] )

    const weatherPanels = Object.keys(weatherRows).map( (day, index) => (
      <WeatherPanel key={day} today={index===0} day={day} city={city} weatherRows={weatherRows[day]}/>
    ));

    return (
      <main>
        {weatherPanels}
      </main>
    )
  }
}
