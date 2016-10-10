import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './weather_app'
import {Provider, connect} from 'react-redux'
import store from './store'

let App = connect((store) => store )(WeatherApp)

let Root = <Provider store={store}><App/></Provider>
ReactDOM.render(Root, document.getElementById('root'))
