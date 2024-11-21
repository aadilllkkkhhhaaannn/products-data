// const express = require("express");
// require("dotenv").config();
// const product = require("./products/menProducts");
// const products = require("./products/womenProducts");
// const kidsproduct = require("./products/kidsProducts");
// const allData = require("./products/allProducts");
// const cors = require("cors");
// const connectDB = require("./config/db_config");

// const app = express();
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.json({
//     msg: "Welcome to the mens'wear clothing API",
//   });
// });

// // DB connect
// connectDB();

// // body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route
// app.use("/api/user", require("./Routes/userRoute"));

// // MEN-CATEGORY
// app.get("/menProducts", (req, res) => {
//   res.json(product);
// });

// // WOMEN-CATEGORY
// app.get("/womenProducts", (req, res) => {
//   res.json(products);
// });

// // KIDS-CATEGORY
// app.get("/kidsProducts", (req, res) => {
//   res.json(kidsproduct);
// });

// // ALL-CATEGORY
// app.get("/allProducts", (req, res) => {
//   console.log("object");
//   res.json(allData);
// });

// app.listen(PORT, (req, res) => {
//   console.log(`server is runnig at port : ${PORT}`);
// });

const express = require("express");
require("dotenv").config();
const product = require("./products/menProducts");
const products = require("./products/womenProducts");
const kidsproduct = require("./products/kidsProducts");
const allData = require("./products/allProducts");
const cors = require("cors");
const connectDB = require("./config/db_config");

const app = express();

// Enable CORS for all domains
app.use(
  cors({
    origin: "*", // This allows all domains
  })
);

// OR for specific domain:
app.use(
  cors({
    origin: "http://localhost:2323", // Allow only this domain
  })
);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the mens'wear clothing API",
  });
});

// DB connect
connectDB();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api/user", require("./Routes/userRoute"));

// MEN-CATEGORY
app.get("/menProducts", (req, res) => {
  res.json(product);
});

// WOMEN-CATEGORY
app.get("/womenProducts", (req, res) => {
  res.json(products);
});

// KIDS-CATEGORY
app.get("/kidsProducts", (req, res) => {
  res.json(kidsproduct);
});

// ALL-CATEGORY
app.get("/allProducts", (req, res) => {
  console.log("object");
  res.json(allData);
});

app.listen(PORT, (req, res) => {
  console.log(`server is running at port : ${PORT}`);
});
