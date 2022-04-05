const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthenticationFailedError = require('../errors/AuthenticationFailedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthenticationFailedError('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthenticationFailedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
