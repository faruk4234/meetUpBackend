const mongoose = require("mongoose");
const connectURL = "mongodb://localhost/meetUpBackend";

module.exports = () => {
  mongoose
    .connect(connectURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongo db connection is succsesfuly");
    })
    .catch((err) => {
      console.log(err);
    });
};
