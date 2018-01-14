const express = require('express');
const router = express.Router();






router.post('/create', (req,res) => {
    console.log('came from client:', req.body);
    
  });





  module.exports = router;