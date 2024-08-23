import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');

const createGalleryTemplate = imgData => {
  return `
  <li class="gallery-card">
  <a class="gallery-link" href=${imgData.largeImageURL}>
    <img class="gallery-img" src="${imgData.webformatURL}" alt="${imgData.tags}" data-source=${imgData.largeImageURL} />
  </a>
<div class="data-wrapper">
<ul class="img-info">
  <li class="param-info"><h2 class="param-name">Likes</h2>
  <p>${imgData.likes}</p></li>
  <li class="param-info"><h2 class="param-name">Views</h2>
  <p>${imgData.views}</p></li>
  <li class="param-info"><h2 class="param-name">Comments</h2>
  <p>${imgData.comments}</p></li>
  <li class="param-info"><h2 class="param-name">Downloads</h2>
  <p>${imgData.downloads}</p></li>
</ul>
</div>
  </li>
  `;
};

const onFormSubmit = event => {
    event.preventDefault();

  const inputValue = searchForm.elements.query.value;

  fetch(
    `https://pixabay.com/api/?key=30578441-e990d3db57773391ef0ba167f&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
      console.log(data);

      if (data.total === 0) {
        iziToast.show({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '24px',
          iconUrl: '/img/error.svg',
          backgroundColor: '#EF4040',
          maxWidth: '330px',
          closeOnClick: true,
          position: 'topRight',
          progressBarColor: '#B51B1B',
        })
      } else {
          const galleryCardsTemplate = data.hits.map(imgInfo => createGalleryTemplate(imgInfo)).join('');

        galleryEl.innerHTML = galleryCardsTemplate;
        
        const onSingleImageClick = event => {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  };

  const imgItem = event.target.closest('.gallery-img');
  const imgSource = imgItem.dataset.source;
  const imgInfo = data.hits.find(image => image.largeImageURL === imgSource);

  const modalInstance =  basicLightbox.create(
    `
  <img
    class="gallery-img"
    src=${imgInfo.largeImageURL}
    data-source=${imgInfo.largeImageURL}
    alt=${imgInfo.tags}
  />
    `
  );

  modalInstance.show();
};

galleryEl.addEventListener('click', onSingleImageClick);
    }
    })
    .catch(err => {
      console.log(err);
    });
  
  galleryEl.innerHTML = '';
  
}

searchForm.addEventListener('submit', onFormSubmit);
