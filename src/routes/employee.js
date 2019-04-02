let EmployeeModel = require("../models/employee.model");
let express = require("express");
let router = express.Router();

// Create a new employee
// this is how we make a post request
// first parameter in the .post() is '/employee':
//POST localhost:3000/employee
// must invoke bodyParser on index.js file to have access to 'body' attribute;
router.post("/employee", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  let model = new EmployeeModel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get data, if name query is not included, get all data;
// may not need to query single name;
router.get("/employee", (req, res) => {
  if (!req.query.name) {
    EmployeeModel.find()
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    EmployeeModel.findOne({
      name: req.query.name
    })
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

// DELETE an employee
router.delete("/employee", (req, res) => {
  if (!req.query.id) {
    return res
      .status(400)
      .send(`bruh, missing URL parameter, id ${req.query.id}`);
  }
  EmployeeModel.findOneAndDelete({
    _id: req.query.id
  })
    .then(`id is: ${req.query.id}`)
    .then(doc => res.json(doc))
    .catch(err => {
      res.status(500).json(err);
    });
});

//PUT update employee info
router.put("/employee", (req, res) => {
  if (!req.query.id) {
    return res.status(400).send("Missing URL parameter, ID");
  }
  EmployeeModel.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true })
    .then(doc => res.json(doc))
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
