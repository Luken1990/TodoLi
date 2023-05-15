const Todo = require('../models/todoSchema');
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler');

const addTodo = asyncHandler(async (req, res) => {
  //request todo value from body
  const { todoItem } = req.body;

  //if length is more than 140 character throw error
  if (todoItem.length > 140) {
    res.status(400);
    throw new Error('Please enter less than 140 characters');
  }

  //object variable containing todo values
  const newTodo = new Todo({
    todoItem: todoItem,
    completed: false,
    user: req.user.id,
  });

  //save/create new todo object
  const todo = await newTodo.save();
  res.status(200).json(todo);
});

//find todo using id
//status 200 ok
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.user.id });
  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  //if todo is not found throw error 400 (bad request)
  if (!todo) {
    res.status(400);
    throw new Error('Todo not found');
  }

  //find user by id
  const user = await User.findById(req.user.id);

  //check if user is in database if not throw error 401 (unauthorized)
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //if the todo item user id does not match the user id throw error (401) (unauthorized)
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  //find todo by id then update it
  const update = await Todo.findByIdAndUpdate(todo, req.body);
  res.status(200).json(update);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  //if todo was not found return status 400 bad request
  //send message not found
  if (!todo) {
    res.status(400);
    res.send(400).send({ message: 'Todo not found' });
  }

  //find user by id
  const user = await User.findById(req.user.id);

  //check if user is in database if not throw error 401 (unauthorized)
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //if the todo item user id does not match the user id throw error (401) (unauthorized)
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  //remove todo
  await todo.remove();
  res.status(200).send({ message: 'Todo deleted' });
});

module.exports = {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
