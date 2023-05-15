const express = require('express');
const router = express.Router();
const {
  addTodo,
  updateTodo,
  getTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { checkJWTToken, checkContentType } = require('./middleware');

//post request
router.post('/add',checkJWTToken, checkContentType, addTodo);
//put request
router.put('/:id', checkJWTToken, checkContentType, updateTodo);
//get request
router.get('/', checkJWTToken, getTodo);
//delete request
router.delete('/:id', checkJWTToken, deleteTodo);

module.exports = router;
