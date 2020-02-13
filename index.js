const express = require("express");
const app = express();
const session = require('express-session');
const passport = require('passport');
const con = require("./database/db");
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());


//Middleware Routes
app.use("/users", userRouter);
app.use("/address", addressRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);

//Test Connection
con.connect(error => {
  if (error) throw error;
  console.log("Connected in database !");
});

//Run Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}...`);
});
