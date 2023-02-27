const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.set('strictQuery', false);

let db;

if (process.env.NODE_ENV == "production") {
  db = mongoose.connect(process.env.MONGO_URI, {
  }, function(err) {
    if (err) {
        throw err;
    } else {console.log("Production Database Connection Successful")}
    })
} else {
  db = mongoose.connect("mongodb://localhost/issuetracker", {
  }, function(err) {
    if (err) {
        throw err;
    } else {console.log("Development Database Connection Successful")}
    });
}

module.exports = db;