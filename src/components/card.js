import { sendLikeToServer, deleteLikeFromServer, deleteCardFromServer } from './api.js';
import { openPopup, closePopup } from './modal.js';

export const createCard = (cardItem, cardConfig) => {
  const cardTemplate = document.getElementById('card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  card.querySelector('.card__title').textContent = cardItem.name;

  const cardLikeCounter = card.querySelector('.card__like-count');
  cardLikeCounter.textContent = cardItem.likes.length;

  cardItem.likes.forEach(like => {
    if(like._id === cardConfig.userId) {
      const likeButton = card.querySelector('.card__like-button');
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  const deleteButton = card.querySelector('.card__delete-button');
  if (cardItem.owner._id === cardConfig.userId) {
    deleteButton.addEventListener('click', () => cardConfig.deleteCard(card, cardItem._id, deleteCardFromServer));
  } else {
    deleteButton.style.display = 'none';
  };

  card.setAttribute('data-id', cardItem._id);

  card.addEventListener('click', (evt) => cardConfig.likeCard(evt, cardItem, cardLikeCounter));
  cardImage.addEventListener('click', () => cardConfig.openImageTypePopup(cardItem.name, cardItem.link));

  return card
};

export const deleteCard = (card, cardId, deleteCardFromServer) => {
  const deleteCardPopup = document.querySelector('.popup_type_delete-card');
  openPopup(deleteCardPopup);

  const confirmDeleteButton = deleteCardPopup.querySelector('.popup__button');

  confirmDeleteButton.addEventListener('click', () => {
    deleteCardFromServer(cardId)
    .then(() => {
      card.remove();
      closePopup(deleteCardPopup)
    })
    .catch((err) => {
      console.log('Ошибка при удалении карточки', err);
    });
  })
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