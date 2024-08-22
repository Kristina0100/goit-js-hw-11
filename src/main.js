import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');

const createGalleryTemplate = imgData => {
  return `
  <li class="gallery-card">
    <img class="gallery-img" src="${imgData.webformatURL}" alt="${imgData.tags}" />
<ul class="img-info">
  <li><p class="param-name">Likes</p>
  <p>${imgData.likes}</p></li>
  <li><p class="param-name">Views</p>
  <p>${imgData.views}</p></li>
  <li><p class="param-name">Comments</p>
  <p>${imgData.comments}</p></li>
  <li><p class="param-name">Downloads</p>
  <p>${imgData.downloads}</p></li>
</ul>
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
    }
    })
    .catch(err => {
      console.log(err);
    });
}

// searchForm.addEventListener('submit', onFormSubmit);

//   const imgItem = event.target.closest('.gallery-image');
//   const imgSource = imgItem.dataset.source;
//   const imgInfo = images.find(image => image.original === imgSource);

//   const modalInstance =  basicLightbox.create(
//     `
//   <img
//     class="gallery-image"
//     src=${imgInfo.original}
//     data-source=${imgInfo.original}
//     alt=${imgInfo.description}
//   />
//     `
//   );

//   modalInstance.show();
// };