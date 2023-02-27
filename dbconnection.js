const mongoose = require("mongoose");
mongoose.Promise = Promise;

if (process.env.NODE_ENV == "production") {
  const db = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    family: 4
  }, function(err) {
    if (err) {
        throw err;
    } else {console.log("Production Database Connection Successful");}
    })
} else {
  const db = mongoose.connect("mongodb://localhost/issuetracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    family: 4
  }, function(err) {
    if (err) {
        throw err;
    } else {console.log("Development Database Connection Successful")}
    });
}

module.exports = db;