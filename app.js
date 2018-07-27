const express = require('express');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views');
const {conn,User, Page} = require('./models');

const app = express();
const PORT = 1337;

conn.authenticate().
  then(() => {
    console.log('connected to the database');
  })

app.get('/', (req,res,next) => {
  res.send(main());
})

const init = async () => {
  await conn.sync({force: true})

  app.listen(PORT, ()=> {
    console.log(`App listening on PORT ${PORT}`)
  })
}

init();