const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ cards }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('У вас нет прав удалять карточки других пользователей');
      }

      return Card.findByIdAndDelete(req.params.cardId)
        .then((deletedCard) => res.status(200).send(deletedCard));
    })
    .catch(next);
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.status(200).send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Введен невалидный id карточки');
      }
      if (err.name === 'ValidationError') {
        next(new Error('неверные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.putLikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((updatedCard) => {
    if (!updatedCard) {
      throw new NotFoundError('Нет карточки с таким id');
    }
    res.status(200).send(updatedCard);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Передан несуществующий _id карточки.');
    }
    if (err.name === 'ValidationError') {
      next(new Error('неверные данные'));
    } else {
      next(err);
    }
  });
