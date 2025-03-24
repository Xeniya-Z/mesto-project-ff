const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    console.log(input.classList, input.validity.valid)
    return !input.validity.valid;
  });
};

const togglePopupButtonState = (inputList, popupButton, config) => {
  
  if (hasInvalidInput(inputList)) {
    popupButton.disabled = true;
    popupButton.classList.add(config.inactiveButtonClass);
  } else {
    popupButton.disabled = false;
    popupButton.classList.remove(config.inactiveButtonClass);
  }
};

const showInputError = (form, input, errorMessage, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
};

export const clearValidation = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const popupSubmitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.setCustomValidity('');
    hideInputError(form, input, config);
  })
  togglePopupButtonState(inputList, popupSubmitButton, config);
};

const checkInputValidity = (form, input, config) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

const setInputEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const popupSubmitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      hideInputError(form, input, config);
      checkInputValidity(form, input, config);
      togglePopupButtonState(inputList, popupSubmitButton, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    setInputEventListeners(form, config);
  });
};