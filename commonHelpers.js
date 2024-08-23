import{i as g}from"./assets/vendor-8e8cd629.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(r){if(r.ep)return;r.ep=!0;const e=s(r);fetch(r.href,e)}})();const c=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),p=t=>`
  <li class="gallery-card">
  <a class="gallery-link" href=${t.largeImageURL}>
    <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" data-source=${t.largeImageURL} />
  </a>
<div class="data-wrapper">
<ul class="img-info">
  <li class="param-info"><h2 class="param-name">Likes</h2>
  <p>${t.likes}</p></li>
  <li class="param-info"><h2 class="param-name">Views</h2>
  <p>${t.views}</p></li>
  <li class="param-info"><h2 class="param-name">Comments</h2>
  <p>${t.comments}</p></li>
  <li class="param-info"><h2 class="param-name">Downloads</h2>
  <p>${t.downloads}</p></li>
</ul>
</div>
  </li>
  `,f=t=>{t.preventDefault();const o=c.elements.query.value;fetch(`https://pixabay.com/api/?key=30578441-e990d3db57773391ef0ba167f&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()}).then(s=>{if(console.log(s),s.total===0)g.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",messageSize:"16px",messageLineHeight:"24px",iconUrl:"/img/error.svg",backgroundColor:"#EF4040",maxWidth:"330px",closeOnClick:!0,position:"topRight",progressBarColor:"#B51B1B"});else{const a=s.hits.map(e=>p(e)).join("");n.innerHTML=a;const r=e=>{if(e.preventDefault(),e.target===e.currentTarget)return;const m=e.target.closest(".gallery-img").dataset.source,i=s.hits.find(u=>u.largeImageURL===m);basicLightbox.create(`
  <img
    class="gallery-img"
    src=${i.largeImageURL}
    data-source=${i.largeImageURL}
    alt=${i.tags}
  />
    `).show()};n.addEventListener("click",r)}}).catch(s=>{console.log(s)}),n.innerHTML=""};c.addEventListener("submit",f);
//# sourceMappingURL=commonHelpers.js.map
