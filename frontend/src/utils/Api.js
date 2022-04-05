class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    // Запрос карточек с сервера
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then((listOfCards) => {
        return this._getResponseData(listOfCards)
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then((userInfo) => {
        return this._getResponseData(userInfo)
      })
  }

  editProfile(newName, newAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  createNewCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        }),
        headers: this._headers
      })
      .then((card) => {
        return this._getResponseData(card)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((card) => {
        return this._getResponseData(card)
      })
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then((avatar) => {
        return this._getResponseData(avatar)
      })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers
      })
      .then((avatar) => {
        return this._getResponseData(avatar)
      })
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}


const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
  authorization: 'bb508992-1a31-4ba5-85c3-62750b591403',
  'Content-Type': 'application/json'
}})

export default api;