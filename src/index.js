let express = require("express");
let app = express();
// reference to /routes/person file
let personRoute = require("./routes/person");
let employeeRoute = require("./routes/employee");
// path module needs to be reference to serve files from public:
let path = require("path");

// To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
// The middleware was a part of Express.js earlier but now you have to install it separately.
// This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. Install body-parser using NPM as shown below.
let bodyParser = require("body-parser");

// wer're using the json module
// this takes any incoming json string and creating an attribute called 'body'
app.use(bodyParser.json());

// 'body' is provided by body-parser from app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  // if we don't call next, it will break the pipeline unless we send a response 'res.send()'
  next();
});

// tell express to register person route
app.use(personRoute);
app.use(employeeRoute);

console.log("hello testing testing");

// Serving a static file using built in express middleware.
// Tell express to use : "app.use()"
// to use this specific static file handler: "express.static()"
// and then pass in the name of the folder you want to serve content from.
app.use(express.static("public"));

// Handler for 404 error- not found;
app.use((req, res, next) => {
  res.status(404).send("You may be lost, theres nothing here human");
});

// Handler for 500 error
// main difference is this one has 4 parameters
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.sendFile(path.join(__dirname, "../public/500.html"));
});

// assign "PORT"  to environment variable PORT, if that doesn't exist, default to 3000;
const PORT = process.env.PORT || 3000;
// tell express to listen to PORT and outputs a message;
app.listen(PORT, () => console.info(`Server started on ${PORT}`));
