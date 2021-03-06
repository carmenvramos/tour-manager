const request = require('superagent');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.WU_API_KEY;


if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getLocation = zip => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;

function processLocationWeatherData(data) {
    return {
        location: {
            city: data.current_observation.display_location.city,
            state: data.current_observation.display_location.state,
            zip: data.current_observation.display_location.zip
        },
        weather: {
            temperature: data.current_observation.temperature_string,
            condition: data.current_observation.weather
        }
    };
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationWeather(zip) {
    return get(getLocation(zip))
        .then(processLocationWeatherData);
};
