const router = require('express').Router()
module.exports = router
const Post = require('../db/models/Post');
const { isLoggedIn } = require('../middleware')

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getPosts());
  } catch (err) {
    next(err)
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getSinglePost(req.params.id*1));
  } catch (err) {
    next(err)
  }
});

router.post('/', isLoggedIn, async(req, res, next) => {
  try{
    res.send(await req.user.addPost(req.body));
  } catch(err){
    next(err)
  }
});

router.delete('/:id',  async(req,res,next) => {
  try{
    const post = await Post.findByPk(req.params.id)
    await post.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err);
  }
})