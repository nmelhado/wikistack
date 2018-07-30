const express = require('express');
const router = express.Router();
const { Page, User } = require("../models");
const { addPage, editPage, main, wikiPage } = require('../views');

router.get('/', async (req,res,next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) { next(err) }
});

router.get('/add/', (req,res,nexx) => {
  res.send(addPage());
})

router.post('/', async (req,res,next) => {
  const arr = await User.findOrCreate({
    where: {
      email: req.body.authorEmail
    },
    defaults: {
      name: req.body.authorName
    }
  })
  const user = arr[0]
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  page.setAuthor(user);
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();
    res.send(wikiPage(page,author));
  } catch (err) { next(err) }
});

module.exports = router;