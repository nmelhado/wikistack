const express = require('express');
const {conn,User, Page} = require('./models');
const wiki = require('./routes/wiki');
const user = require('./routes/user');
const morgan = require('morgan');

const app = express();
const PORT = 1337;

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/wiki', wiki);
app.use('/users', user);

conn.authenticate().
  then(() => {
    console.log('connected to the database');
  })

app.get('/', (req,res,next) => {
  res.redirect('/wiki');
})

const init = async () => {
  await conn.sync({force: false})

  app.listen(PORT, ()=> {
    console.log(`App listening on PORT ${PORT}`)
  })
}

init();