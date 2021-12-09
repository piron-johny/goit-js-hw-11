import '../css/main.css';
import { FetchImages } from '../js/fetchImages';
import markup from '../hbs/markup.hbs';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';

const form = document.getElementById('search-form');
const markupBox = document.querySelector('.gallery');

const fetchServises = new FetchImages();

form.addEventListener('submit', onFormSubmit);


function onFormSubmit(e) {
  e.preventDefault()
  fetchServises.query = e.currentTarget.elements.searchQuery.value;
  if (fetchServises.inputValue === '') return alert('Поле ввода не может быть не заполнено!')

  markupBox.innerHTML = '';
  fetchServises.fetchImages().then(data => {
    render(data);
    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      overlay: true,
      preloading: true,
      alertErrorMessage: 'Изображение не найдено, будет загружено следующее изображение',
    });
  });
}

function render(data) {
  const markupElementOfFetch = data.map(elem => markup(elem)).join('');
  return markupBox.insertAdjacentHTML('beforeend', markupElementOfFetch)
}


let infScroll = new InfiniteScroll('.gallery', {
  responseType: 'text',
  history: false,
  path() {
    return fetchServises.fetchImages()
  }
});



