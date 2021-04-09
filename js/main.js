import galleryImages from './gallery-items.js';

const refs = {
   galleryList: document.querySelector('.js-gallery'),
   divModalEl: document.querySelector('.js-lightbox'),
   imageModalEl: document.querySelector('.lightbox__image'),
   buttonModalEl: document.querySelector('[data-action="close-lightbox"]')
}

function makeGalleryImages(galleryImages) {
   galleryImages.forEach(image => {
      refs.galleryList.insertAdjacentHTML('beforeend', `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
    
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`);  
  });
}
makeGalleryImages(galleryImages);

refs.galleryList.addEventListener('click', openGalleryModal);
refs.divModalEl.addEventListener('click', onOverlayClick);
refs.buttonModalEl.addEventListener('click', closeGalleryModal);

function openGalleryModal(evt) {
   evt.preventDefault();
   refs.imageModalEl.src = evt.target.dataset.source;
   refs.divModalEl.classList.add('is-open');

   window.addEventListener('keydown', onEscKeyPress);
   window.addEventListener('keydown', onArrowLeftKeyPress);
   window.addEventListener('keydown', onArrowRightKeyPress);
 
};

function onOverlayClick(evt) {
   if (evt.target === refs.divModalEl.firstElementChild) {
      closeGalleryModal();
   } 
};

function onEscKeyPress(evt) {
   if (evt.code === "Escape") {
      closeGalleryModal();
   }
};

function closeGalleryModal(evt) {
   refs.imageModalEl.src = '';
   refs.divModalEl.classList.remove('is-open');
   removeEvent();
};

function removeEvent () {
      window.removeEventListener('keydown', onEscKeyPress);
      window.removeEventListener('keydown', onArrowLeftKeyPress);
      window.removeEventListener('keydown', onArrowRightKeyPress);
}

function onArrowRightKeyPress(evt) {
  
   if (evt.code === "ArrowRight") {

      for (let index = 0; index < galleryImages.length; index++) {

         if (refs.imageModalEl.src === galleryImages[index].original ) {
            refs.imageModalEl.src = galleryImages[index + 1].original;
         break
         };
         if (refs.imageModalEl.src === galleryImages[galleryImages.length-1].original){
            refs.imageModalEl.src = galleryImages[0].original
            break
         };
      };
   };
};

function onArrowLeftKeyPress(evt) {
   if (evt.code === "ArrowLeft") {

      for (let index = 0; index <= galleryImages.length; index++) {

         if (refs.imageModalEl.src === galleryImages[0].original) {
            refs.imageModalEl.src = galleryImages[galleryImages.length-1].original
         break
         };
         if (refs.imageModalEl.src === galleryImages[index].original) {
              refs.imageModalEl.src = galleryImages[index - 1].original;
         break
        };
      };
   };
};