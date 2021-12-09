import '../css/main.css';
import { FetchImages } from '../js/fetchImages';
import markup from '../hbs/markup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const form = document.getElementById('search-form');
const markupBox = document.querySelector('.gallery');
const loader = document.querySelector('.bounce');

const fetchServises = new FetchImages();

form.addEventListener('submit', onFormSubmit);
window.addEventListener('scroll', debounce(onFetchToScroll, 200));

function onFormSubmit(e) {
  e.preventDefault();
  showLoader();
  fetchServises.query = e.currentTarget.elements.searchQuery.value;
  fetchServises.resetPage();
  if (fetchServises.inputValue === '') return alert('Поле ввода не может быть не заполнено!');

  markupBox.innerHTML = '';
  fetchServises.fetchImages().then(data => {
    hideLoader();
    render(data.hits);
    lightBox();
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  });
}

function render(data) {
  const markupElementOfFetch = data.map(elem => markup(elem)).join('');
  return markupBox.insertAdjacentHTML('beforeend', markupElementOfFetch);
}

function onFetchToScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5 && hasMoreQuotes(fetchServises.showParams())) {
    showLoader();
    setTimeout(() => {
      fetchServises.fetchImages().then(data => {
        render(data.hits);
        lightBox();
        hideLoader();
      });
    }, 500);
  }

  if (!hasMoreQuotes(fetchServises.showParams())) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    // window.removeEventListener('scroll', onFetchToScroll);
    return;
  }
}

function hasMoreQuotes({ page, per_page, total }) {
  const startIndex = (page - 1) * per_page + 1;
  return total === 0 || startIndex < total;
}

function lightBox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    overlay: true,
    preloading: true,
    alertErrorMessage: 'Изображение не найдено, будет загружено следующее изображение',
  });
  return lightBox;
}

function showLoader() {
  loader.classList.add('show');
}

function hideLoader() {
  loader.classList.remove('show');
}
