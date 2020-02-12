const express = require("express");
const app = express();
const con = require("./database/db");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport");
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const dashboardRouter = require("./routes/dashboard");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true
  })
);

//Config Passport (From config/passport)
initializePassport(passport);

//Passport Session
app.use(passport.initialize());
app.use(passport.session());

//Middleware Routes
app.use("/users", userRouter);
app.use("/address", addressRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/dashboard", dashboardRouter);

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
