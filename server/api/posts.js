const router = require('express').Router()
module.exports = router
const { isLoggedIn } = require('../middleware')

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getPosts());
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