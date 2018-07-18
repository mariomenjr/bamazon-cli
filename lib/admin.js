const conn = require("./conn");
const table = require("./table");
const queries = require("./queries");
const inquirer = require("inquirer");

const Store = require("./store");

function Admin() {
  this._options = [
    { value: 1, name: "View Products for Sale" },
    { value: 2, name: "View Low Inventory" },
    { value: 3, name: "Add to Inventory" },
    { value: 4, name: "Add New Product" }
  ];
}

Admin.prototype.options = function() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to continue shopping?",
        name: "option",
        choices: this._options
      }
    ])
    .then(answers => {
      if (answers.option == "1") {
        this.showInv();
        conn.end();
      } else if (answers.option == "2") {
        this.showInvLow();
        conn.end();
      } else if (answers.option == "3") {
      } else if (answers.option == "4") {
      } else {
        console.log("Unknown option.");
      }
    })
    .catch(err => {
      throw err;
    });
};

Admin.prototype.showInv = function() {
  conn.query(queries.SHOW_ALL, (err, results, fields) => {
    table.cli(["Item#", "Product", "Department", "Price$", "Qty"], results);
  });
};

Admin.prototype.showInvLow = function() {
  conn.query(queries.SHOW_LOW, (err, results, fields) => {
    table.cli(["Item#", "Product", "Department", "Price$", "Qty"], results);
  });
};

module.exports = Admin;
