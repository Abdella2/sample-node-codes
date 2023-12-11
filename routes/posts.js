const fs = require('fs');
const express = require('express');

const router = express.Router();

const posts = [];

fs.readFile('./models/posts.json', (err, data) => {
  if (!err) JSON.parse(data.toString()).map((post) => posts.push(post));
});

router.get('/', (req, res) => {
  res.send(posts);
});

router.get('/:id', (req, res) => {
  res.send(posts.find((post) => post.id === +req.params.id));
});

router.post('/', (req, res) => {
  const post = req.body;
  post.id = posts.length + 1;
  post.userId = 10;
  posts.push(post);
  return res.send(post);
});

router.put('/:id', (req, res) => {
  const post = posts.find((post) => post.id === +req.params.id);

  post.title = req.body.title;
  post.body = req.body.body;

  res.send(post);
});

router.delete('/:id', (req, res) => {
  const post = posts.find((p) => p.id === +req.params.id);

  if (!post)
    return res.status(404).send(`Post with id ${req.params.id} not found.`);

  const index = posts.indexOf(post);
  posts.splice(index, 1);

  return res.send(post);
});
module.exports = router;
