const mongoose = require('mongoose');

//blueprint for todo data
const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  todoItem: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
},
{
  timestamps:true
}
);

module.exports = mongoose.model('Todo', TodoSchema);
 