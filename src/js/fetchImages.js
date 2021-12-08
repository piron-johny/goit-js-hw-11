const axios = require('axios');

async function fetchImages(searchImg) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '24644022-4984203066fb287d0befab6c3',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: searchImg,
      }
    });
    // console.log(response.data.hits);
    const data = response.data.hits
    return data
  } catch (error) {
    console.error(error);
  }
}

export { fetchImages }