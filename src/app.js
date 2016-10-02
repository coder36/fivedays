import React from 'react'
import 'whatwg-fetch'
import Weather from './weather'

export default class extends React.Component {

  constructor() {
    super();
    this.state = {weather: {}}
    this.loadWeather();
  }

  loadWeather() {
    let url = "http://api.openweathermap.org/data/2.5/forecast?APPID=019a736fd448ec0464f324f3f7063003&units=metric&q=Florida,us&mode=json"
    fetch(url).then(resp => resp.json()).then((weather) => {
      this.setState({weather})
    })
  }

  render() {
    return <Weather/>
  }
}
