# 5 day forecast

"Build a single HTML page displaying the 5 day weather forecast for a location of your choice."

## My Solution

#### [Demo](http://fiveday.herokuapp.com)

## Technology stack

* React
* [create-react-app](https://github.com/facebookincubator/create-react-app) - this is a real win as it saves on all the webpack configuration and gives a nice development environment with linting, testing and post css processing.
* Node

## Building
Assuming node 6.5.0

```
npm install
npm start
```
This will start up the app in development mode.
Navigate to [http://localhost:3000](http://localhost:3000)

## Testing
```
CI=true npm test -- --coverage
```

You can launch Jest in watch mode which is great during development:
```
npm test
```


# Deployment
```
  heroku create fivedays --buildpack https://github.com/mars/create-react-app-buildpack.git
  git push heroku master
```

In `static.json` I've set the static assets to be cached in the browser using the `max-age` `cache-control` setting. Since I expect the final javascript minified file to be over 100K, this will make a great optimisation - on a slow internet connection ie. 3g there would otherwise be a visible delay whilst downloading the assets. For continous deployments, need to make sure the static assets have a unique name - create-react-app does this for us by appending a hash (awesome!).


# If I had more time...

### Test and code for error conditions
What would happen if the weatherapi end point was unavailable ?  At the moment you would just get a blank page.  Also JEST (the test framework I used) kind of assumes your react components are pure functions with no side effects.  Given that I've used the ES6 fetch api with Promises, means that I would have to find some other way to test this (I would probably do it as a cucumber with mirage test).

### Caching
The openweather api says that the api should only be called every 10 minutes.  My code does not enforce this.  A really simple/fudge would be to create an express server endpoint which proxies the call to the openweather api adding in a `cache-control` header setting the `max-age` to 10 minutes.  Crude, but it would be an immediate win.      

### GraphQL
The openweather api could be exposed as a graphql end point.  Not really appropriate for this exercise, but for a bigger app I would absolutally consider using GraphQL over REST.

### Cucumber / BDD
I would create a set of cucumber tests as I think the gherkin BDD approach better documents the way end users would see and use the system.  It would also allow me to tie business value to my design decisions.  Implementation wise, I would use Ruby/Capybara to write the tests as its a doddle to work with.  [Mirage](https://github.com/lashd/mirage) is a great way to programatically mock REST data.

### Enivonment configuration
I've hard coded the openweather api url into the code.  This could be externalised and injected at deployment time.  create-react-app has a really nice way to allow environment variables to be embedded into the react code.

# Notes

* I've only tried it on the chrome browser.
