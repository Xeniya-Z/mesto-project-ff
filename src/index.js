import './pages/index.css';
import { initialCards, createCard, addCard, likeCard, openImageTypepopup } from './scripts/cards.js';
import { openPopup, closePopupOnEsc, closePopupByButton, closePopupByOverlayclick, handleFormSubmit } from './scripts/modal.js';

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

export const cardTemplate = document.getElementById('card-template').content;
export const cardList = document.querySelector('.places__list');
export const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
export const cardInputName = document.querySelector('.popup__input_type_card-name');
export const cardInputLink = document.querySelector('.popup__input_type_url');

addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard(cardInputName.value, cardInputLink.value, likeCard, openImageTypepopup);
});


export const deleteCard = (card) => card.remove();
export const placesList = document.querySelector('.places__list');
initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeCard, openImageTypepopup);
  placesList.append(card);
});

export const popups = document.querySelectorAll('.popup');
export const popupCloseButton = document.querySelectorAll('.popup__close');

popupCloseButton.forEach((button) => {
  button.addEventListener('click', closePopupByButton);
});

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlayclick);
});

export const profileButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const imageCardButtons = document.querySelectorAll('.card__image');


profileButton.addEventListener('click', () => {
  openPopup('.popup_type_edit');
});

profileAddButton.addEventListener('click', () => {
  openPopup('.popup_type_new-card');
});

imageCardButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openPopup('.popup_type_image');
  });
});

export const formElement = document.querySelector('.popup__form[name="edit-profile"]');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;


formElement.addEventListener('submit', handleFormSubmit);



