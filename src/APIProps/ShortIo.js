const axios = require('axios');

const data = {
    "hideReferer":false,
    "httpsLinks":false,
    "hostname":"shorten.giakhang3005.com",
    "linkType":"random"
};

const options = {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'sk_n1T31bncBvMAvXVL'
  }
};

axios.post('https://api.short.io/domains/', data, options)
.then(function (response) {
  console.log(response.data);
})
.catch(function (response) {
  console.log(response);
});