import{i as m,S as p}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const u=r=>`
  <li class="gallery-card">
  <a class="gallery-link" href=${r.largeImageURL}>
    <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" data-source=${r.largeImageURL} />
  </a>
<div class="data-wrapper">
<ul class="img-info">
  <li class="param-info">
  <h2 class="param-name">Likes</h2>
  <p class="param-value">${r.likes}</p></li>
  <li class="param-info">
  <h2 class="param-name">Views</h2>
  <p class="param-value">${r.views}</p></li>
  <li class="param-info">
  <h2 class="param-name">Comments</h2>
  <p class="param-value">${r.comments}</p></li>
  <li class="param-info">
  <h2 class="param-name">Downloads</h2>
  <p class="param-value">${r.downloads}</p></li>
</ul>
</div>
  </li>
  `,d="https://pixabay.com/api/",f=r=>{const t=new URLSearchParams({key:"30578441-e990d3db57773391ef0ba167f",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:21});return fetch(`${d}?${t}`).then(a=>{if(!a.ok)throw new Error(a.status);return a.json()})},c=document.querySelector(".js-search-form"),i=document.querySelector(".js-gallery"),n=document.querySelector(".js-loader"),h=r=>{r.preventDefault();const t=c.elements.query.value.trim();if(!t){m.warning({message:"Please enter a search term",closeOnClick:!0,position:"topRight"});return}n.classList.remove("is-hidden"),i.innerHTML="",f(t).then(a=>{if(a.total===0){m.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",messageSize:"16px",messageLineHeight:"24px",iconUrl:"/img/error.svg",backgroundColor:"#EF4040",maxWidth:"350px",closeOnClick:!0,position:"topRight",progressBarColor:"#B51B1B"}),n.classList.add("is-hidden"),i.innerHTML="",c.reset();return}n.classList.add("is-hidden");const o=a.hits.map(s=>u(s)).join("");i.innerHTML=o,new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}).catch(a=>{console.log(a)})};c.addEventListener("submit",h);
//# sourceMappingURL=commonHelpers.js.map
