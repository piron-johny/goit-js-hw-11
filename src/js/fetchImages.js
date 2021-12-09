const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class FetchImages {
  constructor() {
    this.inputValue = '';
    this.page = 1;
    this.per_page = 40;
    this.total = '';
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
          per_page: this.per_page,
          page: this.page,
        },
      });
      if (response.data.hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      this.incrementPage();
      this.total = response.data.totalHits;
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  get query() {
    return this.inputValue;
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

  showParams() {
    return {
      page: this.page,
      per_page: this.per_page,
      total: this.total,
    };
  }
}

export { FetchImages };
