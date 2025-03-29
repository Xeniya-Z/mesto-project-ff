import './pages/index.css';
import {
  createCard,
  deleteCard,
  likeCard,
} from './components/card.js'

import { 
  openPopup,
  closePopup,
  setPopupEventListeners
} from './components/modal.js';

import {
  clearValidation,
  enableValidation
} from './components/validation.js'

import {
  getProfileData,
  getCards,
  changeProfileData,
  changeProfileAvatar,
  postCardToServer,
} from './components/api.js';

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
const editAvatarImage = new URL('./images/edit-avatar.svg', import.meta.url);

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
  { name: 'edit-avatar', link: editAvatarImage },
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  inactiveButtonClass: 'popup__button_disabled'
};

enableValidation(validationConfig);

const openImageTypePopup = (cardTitle, cardUrl) => {
  const imageTypePopup = document.querySelector('.popup_type_image');
    
  const popupImage = imageTypePopup.querySelector('.popup__image');
  const imagePopupCapture = imageTypePopup.querySelector('.popup__caption');

  popupImage.src = cardUrl;
  popupImage.alt = `Фотография места: ${cardTitle}`;
  imagePopupCapture.textContent = cardTitle;
    
  openPopup(imageTypePopup);
};

const cardConfig = {
  deleteCard,
  likeCard,
  openImageTypePopup,
  userId
};

const placesList = document.querySelector('.places__list');

const cardInputName = document.querySelector('.popup__input_type_card-name');
const cardInputLink = document.querySelector('.popup__input_type_url');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

const addCard = (cardItem, cardConfig) => {
  const saveButton = addCardForm.querySelector('.popup__button');
  setButtonLoadingState(saveButton, true);

  postCardToServer(cardItem.name, cardItem.link)
    .then((data) => {
      const card = createCard(data, cardConfig);
      placesList.prepend(card);

      addCardForm.reset();
      closePopup(document.querySelector('.popup_is-opened'));
    })
    .catch((err) => {
      console.log('Ошибка при добавлении карточки:', err);
    })
    .finally(() => setButtonLoadingState(saveButton, false))
};

addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardItem = { name: cardInputName.value, link: cardInputLink.value };
  addCard(cardItem, cardConfig);
});

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  setPopupEventListeners(popup);
});

const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const avatarButton = document.querySelector('.avatar__edit-button');

avatarButton.addEventListener('click', () => {
  openPopup(popupTypeEditAvatar);
  clearValidation(avatarFormElement, validationConfig);
});

const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');

profileButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openPopup(popupTypeEdit);
  clearValidation(profileFormElement, validationConfig);
});

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(addCardForm, validationConfig);
});

const avatarFormElement = document.querySelector('.popup__form[name="edit-avatar"]');
const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar_url');

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const saveButton = avatarFormElement.querySelector('.popup__button');
  setButtonLoadingState(saveButton, true);

  const avatarInputValue = avatarInput.value;

  changeProfileAvatar(avatarInputValue)
    .then((data) => {
      if (data) {
        const profileImage = document.querySelector('.profile__image');
        profileImage.style.backgroundImage = `url('${data.avatar}')`;

        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);

        avatarInput.value = '';
      }
    })
    .catch((err) => {
      console.log('Ошибка при обновлении аватара:', err);
    })
    .finally(() => setButtonLoadingState(saveButton, false))
};

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const saveButton = profileFormElement.querySelector('.popup__button');
  setButtonLoadingState(saveButton, true);

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  changeProfileData(nameInputValue, jobInputValue)
  .then((data) => {
    if (data) {
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
    
      profileTitle.textContent  = nameInputValue;
      profileDescription.textContent  = jobInputValue;
    
      const popup = document.querySelector('.popup_is-opened');
      closePopup(popup);
    }
  })
  .catch((err) => {
    console.log('Ошибка при обновлении данных Пользователя:', err)
  })
  .finally(() => setButtonLoadingState(saveButton, false))
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

let userId;
let cardId;

Promise.all([getProfileData(), getCards()])
.then(([profileData, cards]) => {
  console.log('Profile Data:', profileData);

  userId = profileData._id;
  cardConfig.userId = userId;

  document.querySelector('.profile__image').style.backgroundImage = `url('${profileData.avatar}')`;
  document.querySelector('.profile__title').textContent = profileData.name;
  document.querySelector('.profile__description').textContent = profileData.about;

  cards.forEach((card) => {
    cardId = card._id;
    const cardElement = createCard(card, cardConfig);
    placesList.append(cardElement);
    cardElement.setAttribute('data-id', cardId);
  });
});

const setButtonLoadingState = (button, isLoading) => {
  if (isLoading) {
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.dataset.originalText;
    delete button.dataset.originalText;
  }
};

