const express = require('express');
const router = express.Router();





router.get('/', (req, res) => {
  res.render('films/films');
});



module.exports = router;