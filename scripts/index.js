// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.getElementById('card-template').content;

const renderCard = (cardItem, deleteCallback) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = cardItem.link;
  card.querySelector('.card__title').textContent = cardItem.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCallback(card));

  return card
}

const deleteCard = (card) => card.remove();

const placesList = document.querySelector('.places__list');
initialCards.forEach((item) => {
  const card = renderCard(item, deleteCard);
  placesList.append(card);
})