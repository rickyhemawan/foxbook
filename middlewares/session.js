const router = require('express').Router();

router.use((req, res, next) => {
  if(!req.session.userId) return res.redirect('/login')
  next();
})

module.exports = router