const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const PORT = 8080 || process.env.PORT;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todoRouters = require('./routes/todoRouters');

connectDB();
const app = express(); 

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouters);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application up and running on port: http://localhost:${PORT}`);
});
module.exports = app;
