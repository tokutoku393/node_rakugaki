'use strict'

const axios = require(`axios`);
const BASE_URL = 'https://us.wio.seeed.io/v1/node';
const ACCESS_TOKEN = '';

const TEMP_API = '/GroveTempA0/temp';
const DISPLAY_API = '/Grove4DigitUART0/display_digits';

const temp_options = {
    method: 'GET',
    url: BASE_URL + TEMP_API + '?access_token=' + ACCESS_TOKEN
};

const set_display = function (position, value) {
  const display_options = {
    method: 'POST',
    url: BASE_URL + DISPLAY_API + '/' + position + '/' + value + '?access_token=' + ACCESS_TOKEN
  }
  return display_options;
}


const update = function () {
  axios(temp_options)
  .then((response) => {
      console.log(response.data.temperature);
      const temperature = response.data.temperature;
      const str_temp = String(temperature);

      const temperature_array = [];
      temperature_array.push(str_temp.charAt(0));
      temperature_array.push(str_temp.charAt(1));
      temperature_array.push(str_temp.charAt(3));
      temperature_array.push('C');

      console.log(temperature_array);

      temperature_array.forEach(function(value, i) {
          const display_options = set_display(i, value);
          axios(display_options)
          .then((response) => {
            console.log(response.data);
          });
      });
  })
  .catch((err) => {
      console.log(err);
  });
}

setInterval(function() {
  update();
}, 3000);
