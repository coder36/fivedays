import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'

const DATA_LOADED = "DATA_LOADED"

function reducer(state = {weather: { ready: false } }, action) {
    switch(action.type) {
        case DATA_LOADED:
            return {
                ready: true,
                weather: action.data
            }
        default:
            return state

    }
}


function dataReady(data) {
    return {
        type: DATA_LOADED,
        data
    }
}

function loadWeather() {
    return function(dispatch) {
        const url = process.env.REACT_APP_API || "http://api.openweathermap.org/data/2.5/forecast?APPID=019a736fd448ec0464f324f3f7063003&units=metric&q=Newcastle,uk&mode=json"
        return fetch(url).then(resp => resp.json()).then((data) => dispatch( dataReady(data) ) )
    }
}

let store = createStore( reducer, applyMiddleware( reduxThunk) )

export default store

store.dispatch(loadWeather())

