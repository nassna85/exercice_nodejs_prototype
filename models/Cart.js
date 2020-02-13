const Model = require("./Model");

function Cart() {
  Model.call(this, {
    tableName: "cart",
    timestamp: false
  });
}

Cart.prototype = Object.create(Model.prototype);
Cart.prototype.constructor = Model;

module.exports = Cart;