const mongoDB = require("mongoose");

const connectDB = async (db_URL) => {
  return mongoDB.connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
