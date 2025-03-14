import { 
  cardTemplate, 
  placesList,
  addCardForm, 
  cardInputName, 
  cardInputLink
} from '../index.js';
import { openPopup } from './modal.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const createCard = (cardItem, deleteCallback, likeCard, openImageTypepopup) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardItem.name;
  card.querySelector('.card__image').src = cardItem.link;
  card.querySelector('.card__image').alt = cardItem.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCallback(card));

  card.addEventListener('click', likeCard);
  card.addEventListener('click', openImageTypepopup);

  return card
};

export const deleteCard = (card) => card.remove();

export const addCard = (cardItemName, cardItemLink, likeCard, openImageTypepopup) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardItemName;
  card.querySelector('.card__image').src = cardItemLink;
  card.querySelector('.card__image').alt = cardItemName;

  placesList.prepend(card);
  cardInputName.value = '';
  cardInputLink.value = '';

  card.addEventListener('click', likeCard);
  card.addEventListener('click', openImageTypepopup);

  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');
};

export const likeCard = (evt) => {
  if (evt.target && evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

export const openImageTypepopup = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const imageTypePopup = document.querySelector('.popup_type_image');
    
    const popupImage = imageTypePopup.querySelector('.popup__image');
    const imagePopupCapture = imageTypePopup.querySelector('.popup__caption');

    popupImage.src = evt.target.src;
    imagePopupCapture.textContent = evt.target.alt;
    
    openPopup('.popup_type_image');
  }
};