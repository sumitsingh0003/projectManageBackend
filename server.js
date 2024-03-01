const app = require("./app");
const connectDB = require("./database");

app.listen(process.env.PORT, () => {
  // Connect to the database
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});