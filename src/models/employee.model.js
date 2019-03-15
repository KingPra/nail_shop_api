let mongoose = require("mongoose");
let pw = require("../../pw");
console.log(pw.server);

const server = pw.server;
const database = pw.database;
const user = pw.user;
const password = pw.password;

// this link comes from mlab.com
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, {
  useNewUrlParser: true
});

let EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  working: Boolean
});

module.exports = mongoose.model("Employee", EmployeeSchema);
