import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import {
  createCard, 
  deleteCard, 
  addCard, 
  likeCard,
} from './components/card.js'

import { 
  openPopup,
  closePopup,
  closePopupOnEsc
} from './components/modal.js';

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

const placesList = document.querySelector('.places__list');

const openImageTypepopup = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const imageTypePopup = document.querySelector('.popup_type_image');
    
    const popupImage = imageTypePopup.querySelector('.popup__image');
    const imagePopupCapture = imageTypePopup.querySelector('.popup__caption');

    popupImage.src = evt.target.src;
    imagePopupCapture.textContent = evt.target.alt;
    
    openPopup('.popup_type_image');
  }
};

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeCard, openImageTypepopup);
  placesList.append(card);
});

export const cardInputName = document.querySelector('.popup__input_type_card-name');
export const cardInputLink = document.querySelector('.popup__input_type_url');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');


addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardItem = { name: cardInputName.value, link: cardInputLink.value };
  const card = addCard(cardItem, deleteCard, likeCard, openImageTypepopup);
  placesList.prepend(card);
});

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', closePopup);
});

const profileButton = document.querySelector('.profile__edit-button');
profileButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openPopup('.popup_type_edit');
});

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', () => {
  openPopup('.popup_type_new-card');
});

const imageCardButtons = document.querySelectorAll('.card__image');
imageCardButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openPopup('.popup_type_image');
  });
});

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent  = nameInputValue;
  profileDescription.textContent  = jobInputValue;

  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');
};

formElement.addEventListener('submit', handleFormSubmit);