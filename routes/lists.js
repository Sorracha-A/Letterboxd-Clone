const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('lists/lists');
});



module.exports = router;