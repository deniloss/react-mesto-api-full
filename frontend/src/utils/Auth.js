const BASE_URL = 'https://auth.nomoreparties.co';
  
export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      authorization: 'bb508992-1a31-4ba5-85c3-62750b591403',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: data.password, email: data.email })
  })
  .then((res) => handleResponse(res));
}

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      authorization: 'bb508992-1a31-4ba5-85c3-62750b591403',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: data.password, email: data.email })
  })
  .then((res) => handleResponse(res))
}

export const validateToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => handleResponse(res))
}
  
  function handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  }
