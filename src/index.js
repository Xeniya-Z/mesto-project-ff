import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import {
  createCard, 
  deleteCard,
  likeCard,
} from './components/card.js'

import { 
  openPopup,
  closePopup,
  closePopupOnEsc,
  setPopupEventListeners
} from './components/modal.js';

import {
  clearValidation,
  enableValidation
} from './components/validation.js'

const addIconImage = new URL('./images/add-icon.svg', import.meta.url);
const avatarImage = new URL('./images/avatar.jpg', import.meta.url);
const card1Image = new URL('./images/card_1.jpg', import.meta.url);
const card2Image = new URL('./images/card_2.jpg', import.meta.url);
const card3Image = new URL('./images/card_3.jpg', import.meta.url);
const closeImage = new URL('./images/close.svg', import.meta.url);
const deleteIconImage = new URL('./images/delete-icon.svg', import.meta.url);
const editIconImage = new URL('./images/edit-icon.svg', import.meta.url);
const likeActiveImage = new URL('./images/like-active.svg', import.meta.url);
const likeInactiveImage = new URL('./images/like-inactive.svg', import.meta.url);
const logoImage = new URL('./images/logo.svg', import.meta.url);

const images = [
  { name: 'add-Icon', link: addIconImage },
  { name: 'avatar', link: avatarImage },
  { name: 'card_1', link: card1Image },
  { name: 'card_2', link: card2Image },
  { name: 'card_3', link: card3Image },
  { name: 'close', link: closeImage },
  { name: 'delete-icon', link: deleteIconImage },
  { name: 'edit-icon', link: editIconImage },
  { name: 'like-active', link: likeActiveImage },
  { name: 'like-inactive', link: likeInactiveImage },
  { name: 'logo', link: logoImage },
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  inactiveButtonClass: 'popup__button_disabled'
};

enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');

const openImageTypePopup = (cardTitle, cardUrl) => {
  const imageTypePopup = document.querySelector('.popup_type_image');
    
  const popupImage = imageTypePopup.querySelector('.popup__image');
  const imagePopupCapture = imageTypePopup.querySelector('.popup__caption');

  popupImage.src = cardUrl;
  popupImage.alt = `Фотография места: ${cardTitle}`;
  imagePopupCapture.textContent = cardTitle;
    
  openPopup(imageTypePopup);
};

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeCard, openImageTypePopup);
  placesList.append(card);
});

const cardInputName = document.querySelector('.popup__input_type_card-name');
const cardInputLink = document.querySelector('.popup__input_type_url');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

const addCard = (cardItem, deleteCard, likeCard, openImageTypePopup) => {
  const card = createCard(cardItem, deleteCard, likeCard, openImageTypePopup);

  cardInputName.value = '';
  cardInputLink.value = '';

  const popup = document.querySelector('.popup_is-opened');
  closePopup(popup);

  return card;
};

addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardItem = { name: cardInputName.value, link: cardInputLink.value };
  const card = addCard(cardItem, deleteCard, likeCard, openImageTypePopup);
  placesList.prepend(card);
});

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  setPopupEventListeners(popup);
});

const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');

profileButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openPopup(popupTypeEdit);
  clearValidation(profileFormElement, validationConfig);
});

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(addCardForm, validationConfig);
});

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent  = nameInputValue;
  profileDescription.textContent  = jobInputValue;

  const popup = document.querySelector('.popup_is-opened');
  closePopup(popup);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);