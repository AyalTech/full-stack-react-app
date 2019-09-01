const express = require('express');
const Weather = require ('../models/weather');

const router = express.Router();

router.get('/:city',(req,res) => {
  Weather.retrieveByCity(req.params.city, (err, weather) => {
   if (err) return res.json(err);
   return res.json(weather)
  })
});

module.exports = router;
