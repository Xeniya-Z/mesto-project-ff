export const createCard = (cardItem, deleteCallback, likeCard, openImageTypePopup) => {
  const cardTemplate = document.getElementById('card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  card.querySelector('.card__title').textContent = cardItem.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCallback(card));

  card.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImageTypePopup(cardItem.name, cardItem.link));

  return card
};

export const deleteCard = (card) => card.remove();

export const likeCard = (evt) => {
  if (evt.target && evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};