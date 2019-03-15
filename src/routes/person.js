let express = require("express");
let router = express.Router();

// making a call to get 'person route
// a route usually has a callback method with 2 parameters: requests (req) and response (res)
router.get("/person", (req, res) => {
  if (req.query.name) {
    res.send(`you have requested a person ${req.query.name}`);
  } else {
  }
  res.send("you have requested a person");
});

// this is getting a person using the params object: name, we can also use query string.
// router.get("/person/:name", (req, res) => {
//   res.send(`you have requested a person ${req.params.name}`);
// });
// this is replaced by if statement on above router using query instead of params
// biggest difference between query and params are query uses '?' ex: 'localhost:3000/person?king'
// params use '/' ex: 'localhost:3000/person/king

router.get("/error", (req, res) => {
  throw new Error("this is a forced error");
});

module.exports = router;
