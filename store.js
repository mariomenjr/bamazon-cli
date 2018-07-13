const Table = require("cli-table");
const Conn = require("./conn");

const inquirer = require("inquirer");

function Store() {
  this.conn = new Conn();
}

Store.prototype.sell = function() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the item# you'd like to purchase:",
        name: "id",
        validate: (input, hash) => {
          return Number(input)>0;
        }
      },
      {
        type: "input",
        message: "How many units would you like to purchase:",
        name: "sale_qty",
        validate: (input, hash) => {
          return Number(input)>0;
        }
      }
    ])
    .then(answers => {
      this.checkInventory(answers);
    })
    .catch(err => {
      throw err;
    });
};

Store.prototype.checkInventory = function(answers) {
  console.log("Checking Inventory", answers);
};

Store.prototype.showAll = function() {
  this.conn.connect();

  this.conn.query("SELECT bp.* FROM bm_products bp", (err, results, fields) => {
    this.cliPrint(results);
    this.conn.end();
  });
};

Store.prototype.cliPrint = function(obj) {
  // instantiate
  var table = new Table({
    head: ["Item#", "Product", "Department", "Price$", "Qty"]
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  for (const key in obj) {
    const el = obj[key];
    table.push([el.id, el.product_name, el.dept_fk, el.price, el.stock_qty]);
  }
  console.log(table.toString());
  this.sell();
};

module.exports = Store;
