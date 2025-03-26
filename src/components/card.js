export const createCard = (cardItem, deleteCallback, likeCard, openImageTypePopup, userId) => {
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
    deleteButton.addEventListener('click', () => {
      deleteCallback(cardItem._id)
      .then(() => {
        card.remove();
      });
    });
  } else {
    deleteButton.style.display = 'none';
  }

  card.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImageTypePopup(cardItem.name, cardItem.link));

  return card
};

export const likeCard = (evt) => {
  if (evt.target && evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};