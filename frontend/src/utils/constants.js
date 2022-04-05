// Объект селекторов необходимых
// для настройки Валидации
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_red-border',
  errorClass: 'popup__input-error_active'
}

// Константы
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__subtext');
export const profilePhoto = document.querySelector('.profile__avatar');
export const avatar = document.querySelector('.profile__ava');
export const avatarInput = document.querySelector('.popup__input_type_photo');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const profileNameField = document.querySelector('.popup__input_type_name');
export const profileJobField = document.querySelector('.popup__input_type_job');
export const deleteIcon = document.querySelector('.elemnents__delete-icon');
export const popupDelete = document.querySelector('.popup-delete-card');
export const popupAddButton = document.querySelector('.popup__button_add');
export const popupEditButton = document.querySelector('.popup__button_edit');

export const deleteCardForm = document.querySelector('.popup__form_confirmation');
export const deleteSubmitButton = document.querySelector('.popup-delete-card__button');

export const userId = 'f5c295f85b5ffcdbbd48d662';