import { popups, popupCloseButton, profileButton, profileAddButton, imageCardButtons, formElement, nameInput, jobInput } from '../index.js';

export function openPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);

  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closePopupOnEsc);
};

export function closePopupByButton(evt) {
  const popup = evt.target.closest('.popup');
    if (popup) {
      popup.classList.remove('popup_is-opened');
    }
};

export function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); 
    if (openedPopup) {
      openedPopup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closePopupOnEsc);
    }
  }
};

export function closePopupByOverlayclick(evt) {
  if (evt.target === evt.currentTarget) {
    evt.currentTarget.classList.remove('popup_is-opened');
  }
};

export function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent  = nameInputValue;
  profileDescription.textContent  = jobInputValue;
};
