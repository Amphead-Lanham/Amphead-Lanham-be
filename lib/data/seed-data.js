const Image = require('../models/image');
const imageData = require('./image-data');
const pool = require('../utils/pool');
const fs = require('fs');

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
Promise.all(

  imageData.map(image => {
    return Image.insert(image);
  })
  // .catch((err) => {
  // // log that I have an error, return the entire array;
  //   console.log('A promise failed to resolve', err);
  //   return imageData;
  // })
);
