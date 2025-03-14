import {
  cardInputName, 
  cardInputLink,
} from '../index.js';

import { initialCards } from '../scripts/cards.js';

export const createCard = (cardItem, deleteCallback, likeCard, openImageTypepopup) => {
  const cardTemplate = document.getElementById('card-template').content;
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

export const addCard = (cardItem, deleteCard, likeCard, openImageTypepopup) => {
  const card = createCard(cardItem, deleteCard, likeCard, openImageTypepopup);

  cardInputName.value = '';
  cardInputLink.value = '';

  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');

  return card;
};


export const likeCard = (evt) => {
  if (evt.target && evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};