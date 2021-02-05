const { Router } = require('express');
const Image = require('../models/image');


module.exports = Router()
  .post('/', (req, res, next) => {
    Image
      .insert(req.body)
      .then(image => res.send(image))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Image
      .find()
      .then(images => res.send(images))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Image
      .findById(req.params.id)
      .then(image => res.send(image))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Image
      .update(req.params.id, req.body)
      .then(image => res.send(image))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Image
      .delete(req.params.id)
      .then(image => res.send(image))
      .catch(next);
  });
