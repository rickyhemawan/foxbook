const router = require('express').Router();

router.use((req, res, next) => {
  if(!req.session.userId) return res.redirect('/login')
  console.log(req, "<<< DARI MIDDLEWARE");
  next();
})

module.exports = router