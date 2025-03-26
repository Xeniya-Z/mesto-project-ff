// перенести .card__like-button-container из файла card__like-button.css
// настроить ошибки catch и then с res.ok
// проверить и починить валидацию
// сделать конфиг на createCard
// разобраться с переменной userId

import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import {
  createCard,
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  inactiveButtonClass: 'popup__button_disabled'
};

enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');

const openImageTypePopup = (cardTitle, cardUrl) => {
  const imageTypePopup = document.querySelector('.popup_type_image');
    
  const popupImage = imageTypePopup.querySelector('.popup__image');
  const imagePopupCapture = imageTypePopup.querySelector('.popup__caption');

  popupImage.src = cardUrl;
  popupImage.alt = `Фотография места: ${cardTitle}`;
  imagePopupCapture.textContent = cardTitle;
    
  openPopup(imageTypePopup);
};

const cardInputName = document.querySelector('.popup__input_type_card-name');
const cardInputLink = document.querySelector('.popup__input_type_url');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

const addCard = (cardItem, deleteCardFromServer, likeCard, openImageTypePopup) => {
  postCardToServer(cardItem.name, cardItem.link)
    .then((data) => {
      const card = createCard(data, deleteCardFromServer, likeCard, openImageTypePopup, userId);
      placesList.prepend(card);

      addCardForm.reset();
      closePopup(document.querySelector('.popup_is-opened'));
    })
    .catch((err) => {
      console.log('Ошибка при добавлении карточки:', err);
    });
};

addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardItem = { name: cardInputName.value, link: cardInputLink.value };
  addCard(cardItem, deleteCardFromServer, likeCard, openImageTypePopup);
});

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  setPopupEventListeners(popup);
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

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

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
    console.log('Ошибка при обновлении профиля:', err)
  })
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


const getProfileData = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    headers: {
      authorization: 'c44508a0-0c2c-4cb7-9d60-63e4113ccd28'
    }
  })
  .then(res => res.json())
};

const getCards = () => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-35/cards', {
    headers: {
      authorization: 'c44508a0-0c2c-4cb7-9d60-63e4113ccd28'
    }
  })
  .then(res => res.json())
};


let userId;

Promise.all([getProfileData(), getCards()])
.then(([profileData, cards]) => {
  console.log('Profile Data:', profileData);

  userId = profileData._id;

  document.querySelector('.profile__image').src = profileData.avatar;
  document.querySelector('.profile__title').textContent = profileData.name;
  document.querySelector('.profile__description').textContent = profileData.about;

  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCardFromServer, likeCard, openImageTypePopup, userId);
    placesList.append(cardElement);
  });
});


// fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c44508a0-0c2c-4cb7-9d60-63e4113ccd28',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Jack Torrance',
//     about: 'Writer and winter caretaker of the Overlook Hotel'
//   })
// });

const changeProfileData = (profileName, profileAbout) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'c44508a0-0c2c-4cb7-9d60-63e4113ccd28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log('Ошибка при отправке данных Пользователя:', err);
  });
}




const postCardToServer = (cardName, cardLink) => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-35/cards', {
    method: 'POST',
    headers: {
      authorization: 'c44508a0-0c2c-4cb7-9d60-63e4113ccd28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((result) => result.json())
  .catch((err) => {
    console.log('Ошибка при отправке карточки:', err);
  });
};

const deleteCardFromServer = (cardId) => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-35/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c44508a0-0c2c-4cb7-9d60-63e4113ccd28'
    }
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log('Error deleting card:', err);
  });
}


