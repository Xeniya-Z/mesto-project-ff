import { sendLikeToServer, deleteLikeFromServer, deleteCardFromServer } from './api.js';

export const createCard = (cardItem, deleteCard, likeCard, openImageTypePopup, userId) => {
  const cardTemplate = document.getElementById('card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  card.querySelector('.card__title').textContent = cardItem.name;

  const cardLikeCounter = card.querySelector('.card__like-count');
  cardLikeCounter.textContent = cardItem.likes.length;

  const deleteButton = card.querySelector('.card__delete-button');
  if (cardItem.owner._id === userId) {
    deleteButton.addEventListener('click', () => deleteCard(card, cardItem._id, deleteCardFromServer));
  } else {
    deleteButton.style.display = 'none';
  }

  card.setAttribute('data-id', cardItem._id);

  card.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImageTypePopup(cardItem.name, cardItem.link));

  return card
};

export const deleteCard = (card, cardId, deleteCardFromServer) => {
  deleteCardFromServer(cardId)
    .then(() => card.remove())
    .catch((err) => {
      console.log('Ошибка при удалении карточки', err);
    });
};

export const likeCard = (evt) => {
  if (evt.target && evt.target.classList.contains('card__like-button')) {
    const likeButton = evt.target;

    const cardElement = likeButton.closest('.card');
    const cardId = cardElement.dataset.id;
    const cardLikeCounter = cardElement.querySelector('.card__like-count');

    likeButton.classList.toggle('card__like-button_is-active');

    if (likeButton.classList.contains('card__like-button_is-active')) {
      sendLikeToServer(cardId)
      .then((updatedLikesCount) => {
        cardLikeCounter.textContent = updatedLikesCount.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка при добавлении лайка', err);
        likeButton.classList.remove('card__like-button_is-active');
      });
    } else {
      deleteLikeFromServer(cardId)
      .then((updatedLikesCount) => {
        cardLikeCounter.textContent = updatedLikesCount.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка при удалении лайка', err);
        likeButton.classList.add('card__like-button_is-active');
      });
    }
  }
};