const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

function generateSlug (title) {
  if(title && title !== '' && title !== null) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

const Page = conn.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  }
});

Page.beforeValidate((page,options) => {
  return page.slug = generateSlug(page.title);
});

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, { as: 'author' });

module.exports = {
  conn,
  Page,
  User
};