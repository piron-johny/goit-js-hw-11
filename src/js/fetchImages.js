const axios = require('axios');


class FetchImages {
  constructor() {
    this.inputValue = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '24644022-4984203066fb287d0befab6c3',
          q: this.inputValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: this.page,
        }
      })

      return response.data.hits
    } catch (error) {
      console.error(error);
    }
  }

  get query() {
    return this.inputValue
  }

  set query(newQuery) {
    this.inputValue = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

}


export { FetchImages }