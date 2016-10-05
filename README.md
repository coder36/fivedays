# 5 day forecast

"Build a single HTML page displaying the 5 day weather forecast for a location of your choice."

## My Solution

I developed the app primarily for a mobile phone display, though it looks great on a desktop:  

### [Demo](http://fivedays.herokuapp.com)

<a href="http://fivedays.herokuapp.com"><img src="https://raw.githubusercontent.com/coder36/5dayforecast/master/public/screenshot.png"/></a>

On a desktop you get the added benefit of tooltips.  Hovering over the wind icon, will give you the wind direction.  Hovering over a weather image will give you a worded description.

## Technology stack

* ES6
* React
* [create-react-app](https://github.com/facebookincubator/create-react-app) - this is a real win as it saves on all the webpack configuration and gives a nice development environment with linting, testing and post css processing.
* Node
* [OpenWeatherMap 5 day forecast](http://openweathermap.org/forecast5)

## Building
Assuming node 6.5.0

```
npm install
npm start
```
This will start up the app in development mode.
Navigate to [http://localhost:3000](http://localhost:3000)

## Testing with Jest
Using [Jest](https://facebook.github.io/jest/):

```
CI=true npm test -- --coverage
```

You can launch Jest in watch mode which is great during development:
```
npm test
```

## Testing with Cucumber
Assuming ruby 2.2.3 and chromedriver are installed

Start up server in cucumber mode:
```
npm run start_in_cucumber_mode
```

In another shell run cucumber

```
cd cucumber
bundle install
cucumber
```

## Deployment
```
  heroku create fivedays --buildpack https://github.com/mars/create-react-app-buildpack.git
  git push heroku master
```

In `static.json` I've set the static assets to be cached in the browser using the `max-age` `cache-control` setting. Since I expect the final javascript minified file to be over 100K, this will make a great optimisation - on a slow internet connection ie. 3g there would otherwise be a visible delay whilst downloading the assets. For continous deployments, need to make sure the static assets have a unique name - create-react-app does this for us by appending a hash (awesome!).

To get an idea of the size of the production javascript bundle run:
```
npm run build
```

# If I had more time...

### Test and code for error conditions
What would happen if the openweatherapi end point was unavailable ?  At the moment you would just get a blank page.  Also Jest (the test framework I used) kind of assumes your react components are pure functions with no side effects.  Given that I've used the ES6 fetch api with Promises, means that I would have to find some other way to test this (I would probably do it as a cucumber with mirage test).

### Caching
The openweather api says that the api should only be called every 10 minutes.  My code does not enforce this.  A really simple/fudge would be to create an express server endpoint which proxies the call to the openweather api adding in a `cache-control` header setting the `max-age` to 10 minutes.  Crude, but it would be an immediate win.      

### GraphQL
The openweather api could be exposed as a graphql end point.  Not really appropriate for this exercise, but for a bigger app I would absolutely consider using GraphQL over REST.

### Cucumber / BDD
I would create a set of cucumber tests as I think the gherkin BDD approach better documents the way end users would see and use the system.  It would also allow me to tie business value to my design decisions.  Implementation wise, I would use Ruby/[Capybara](https://github.com/jnicklas/capybara)/Selenium to write the tests as it seems to work really well with react.  [Mirage](https://github.com/lashd/mirage) is a great way to programatically mock REST endpoints within the cucumber stepdefs.

### Enivonment configuration
I've hard coded the openweather api url into the code.  This could be externalised and injected at deployment time.  create-react-app has a really nice way to allow environment variables to be embedded into the react code.

### Search for location
A nice feature would be the ability to search for a location.  At the moment its hardcoded to Newcastle.

# Notes

* Only tested on the chrome browser.
