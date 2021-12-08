import '../css/main.css';
import { fetchImages } from '../js/fetchImages';
import markup from '../hbs/markup.hbs';

const form = document.getElementById('search-form');
const markupBox = document.querySelector('.gallery');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault()
  markupBox.innerHTML = '';
  const inputValue = e.currentTarget.elements.searchQuery.value;
  fetchImages(inputValue).then(data => render(data));
}

function render(data) {
  const markupElementOfFetch = data.map(elem => markup(elem)).join('');
  return markupBox.insertAdjacentHTML('beforeend', markupElementOfFetch)
}