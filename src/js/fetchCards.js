const axios = require('axios');
const KEY = '24644022-4984203066fb287d0befab6c3';
const OPTION_URL = '&image_type=photo&orientation=horizontal&safesearch=true';
const BEST_URL = `https://pixabay.com/api/?key=${KEY}&q=cat${OPTION_URL}`;

axios
  .fetch(`${BEST_URL}`)
  .then(response => response.json())
  .then(data => console.log(data));
