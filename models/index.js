const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

const Page = conn.define('page', {
  title: Sequelize.STRING,
  slug: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: Sequelize.ENUM('open', 'closed')
});

const User = conn.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})



module.exports = {
  conn,
  Page,
  User
};