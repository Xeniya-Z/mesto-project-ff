import { cardTemplate, cardList, addCardForm, cardInputName, cardInputLink, deleteCard, placesList } from '../index.js';
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
  cardList.addEventListener('click', openImageTypepopup);

  return card
};

export function addCard(cardItemName, cardItemLink, likeCard, openImageTypepopup) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardItemName;
  cardElement.querySelector('.card__image').src = cardItemLink;
  cardElement.querySelector('.card__image').alt = cardItemName;

  cardList.prepend(cardElement);
  cardInputName.value = '';
  cardInputLink.value = '';

  cardList.addEventListener('click', likeCard);
  cardList.addEventListener('click', openImageTypepopup);

  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');
};

export function likeCard(evt) {
  if (evt.target && evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

export function openImageTypepopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    const imageTypePopup = document.querySelector('.popup_type_image');
    
    const popupImage = imageTypePopup.querySelector('.popup__image');
    const imagePopupCapture = imageTypePopup.querySelector('.popup__caption');

    popupImage.src = evt.target.src;
    imagePopupCapture.textContent = evt.target.alt;
    
    openPopup('.popup_type_image');
  }
};