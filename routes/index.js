var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var counter = req.app.locals.counter;
  // console.log("counter:", counter)
  console.log("res", req.app.locals.counter)
  res.render('index', { counter });
});

// router.get('/increment',(req,res)=>{
//   var counter = req.app.locals.counter;
//   req.app.locals.counter = counter+1;
//   res.redirect('/');
// })

router.get('/reset', (req,res)=>{
  req.app.locals.counter = 0;
  res.redirect('/');
})

module.exports = router;
