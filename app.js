// jshint esversion:8
const fetch = require('node-fetch');

const YELP_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5';
const AUTH_TOKEN = 'Bearer ' + 'Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx';
const FETCH_OPTIONS = {
  method: 'GET', 
  mode: 'cors',
  headers: {
    'Authorization': AUTH_TOKEN,
    'X-Requested-With': 'XMLHttpRequest'
  }
};


fetch(YELP_SEARCH_URL, FETCH_OPTIONS)
  .then(response => response.json())
  .then(async (data) => {
    let i = 1;
    for (const bs of data.businesses) {
      let reviewUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/'+bs.id+'/reviews';
      const response = await fetch(reviewUrl, FETCH_OPTIONS);
      const reviewData = await response.json();
      printRestaurantWithReview(bs, reviewData, i++);
    }
  })
  .catch(error => console.error(error));

function printRestaurantWithReview(bs, review, index) {
    console.log((index)+'. Name of the restaurant: '+bs.name);
    console.log('   Address : '+ bs.location.display_address.join(','));
    console.log('   Review by : ');
    console.log('    '+ review.reviews[0].user.name + ' ('+ review.reviews[0].time_created.substring(0,10) +') - ' + review.reviews[0].rating + '/5');
}