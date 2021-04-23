const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
   post.save().then(newPost => {
    res.status(201).json({
      message: 'Post added successfully.',
      id: newPost._id
    });
   });
});

router.get('', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Collection of posts!',
      posts: documents
    });
  })
});


router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found!',
      });
    }

  })
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id }).then(response => {
    res.status(200).json({message: 'Post deleted successfully!'});
  });

});

router.put('/:id', (req,res,next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
   Post.updateOne({_id: req.body.id}, post).then(newPost => {
    res.status(200).json({
      message: 'Post updated successfully.',
    });
   });
});
module.exports = router;
