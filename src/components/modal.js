export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closePopupOnEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  
  document.removeEventListener('keydown', closePopupOnEsc);
};

const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

export const setPopupEventListeners = (popup) => {
  popup.classList.add('popup_is-animated');

  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', (evt) => {
    closePopup(popup)
  });

  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}