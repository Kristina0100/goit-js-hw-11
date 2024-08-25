import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createGalleryTemplate } from '/js/render-functions';
import { fetchPhotos } from '/js/pixabay-api';


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

const onFormSubmit = event => {
  event.preventDefault();

  const inputValue = searchFormEl.elements.query.value.trim();

    if (!inputValue) {
      iziToast.warning({
      message: 'Please enter a search term',
      closeOnClick: true,
      position: 'topRight',
});
    return;
  }

  loaderEl.classList.remove("is-hidden");
  galleryEl.innerHTML = '';

fetchPhotos(inputValue)
    .then(data => {
      if (data.total === 0) {
        iziToast.show({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '24px',
          iconUrl: '/img/error.svg',
          backgroundColor: '#EF4040',
          maxWidth: '350px',
          closeOnClick: true,
          position: 'topRight',
          progressBarColor: '#B51B1B',
        });

        loaderEl.classList.add("is-hidden");
        galleryEl.innerHTML = '';
        searchFormEl.reset();

        return
      };

      loaderEl.classList.add("is-hidden");

      const galleryCardsTemplate = data.hits.map(imgInfo => createGalleryTemplate(imgInfo)).join('');
      galleryEl.innerHTML = galleryCardsTemplate;
                
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      lightbox.refresh();
    }
    )
    .catch(err => {
      console.log(err);
    });

};

searchFormEl.addEventListener('submit', onFormSubmit)
