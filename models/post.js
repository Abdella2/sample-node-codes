const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  id: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

exports.Post = Post;
