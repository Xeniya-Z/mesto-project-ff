import { 
  popups,
  profileButton, 
  profileAddButton, 
  imageCardButtons, 
  formElement, 
  nameInput, 
  jobInput 
} from '../index.js';

export const openPopup = (popupSelector) => {
  const popup = document.querySelector(popupSelector);

  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closePopupOnEsc);
};

export const closePopup = (evt) => {
  const popup = evt.target.closest('.popup');

  if (evt.target.closest('.popup__close') || (evt.target === evt.currentTarget)) {
    popup.classList.remove('popup_is-opened');
  }
};

export const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');

    if (openedPopup) {
      openedPopup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closePopupOnEsc);
    }
  }
};

export const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent  = nameInputValue;
  profileDescription.textContent  = jobInputValue;
};