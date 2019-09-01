const express = require('express');
const Cities = require('../models/cities');

const router = express.Router();

router.get('/', (req,res) => {
  Cities.retrieveAll((err, cities) => {
    if (err) return res.json(err);
    return res.json(cities);
  })
});

router.post('/', (req,res) => {
  Cities.insert(req.body.city, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  })
});

module.exports = router;
