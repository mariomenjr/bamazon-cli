const conn = require("./conn");
const table = require("./table");
const queries = require("./queries");
const inquirer = require("inquirer");

/**
 * Store constructor function
 */
function Store() {
  this.data = [];
}

/**
 * Asking the item# and the qty desired by the customer,
 * This method will call a method to modify information stored in table.
 */
Store.prototype.sellQuestions = function() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the item# you'd like to purchase:",
        name: "id",
        validate: (input, hash) => {
          input = Number(input);
          return input > 0 && this.data.map(e => e.id).indexOf(input) >= 0;
        }
      },
      {
        type: "input",
        message: "How many units would you like to purchase:",
        name: "sale_qty",
        validate: (input, hash) => {
          return Number(input) > 0;
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

/**
 * Modifying update inventory.
 * @param {*} answers The answer object from inquirer
 */
Store.prototype.updateInventory = function(answers) {
  conn.query(
    queries.UPDATE_ITEM_STOCK,
    [Number(answers.sale_qty), Number(answers.id)],
    (err, results, fields) => {
      this.continueShopping();
    }
  );
};

/**
 *
 * @param {*} answers The answer object from inquirer
 */
Store.prototype.checkInventory = function(answers) {
  const selectedItem = Number(answers.id);
  const selectedQty = Number(answers.sale_qty);

  index = this.data.map(e => e.id).indexOf(selectedItem);
  if (index >= 0) {
    if (this.data[index].stock_qty >= selectedQty) {
      console.log(
        `\n\tYour total is ${selectedQty} x ${
          this.data[index].price
        } = $${selectedQty * this.data[index].price}\n`
      );
      this.updateInventory(answers);
    } else {
      console.log(`\n\tInsufficient quantity!\n`);
    }
  } else {
    console.log(
      `\n\tItem ${answers.id} is not an option being shown in the table.\n`
    );
  }
};

/**
 * Asking customer if he/she would like to continue shopping.
 */
Store.prototype.continueShopping = function() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to continue shopping?",
        name: "option",
        choices: [
          { value: true, name: "Yes, I'd love to" },
          { value: false, name: "No, that's all for me this time." }
        ]
      }
    ])
    .then(answers => {
      if (answers.option) {
        this.showAll();
      } else {
        console.log(`\n\tThank you for your purchase!\n`);
      }
    })
    .catch(err => {
      throw err;
    });
};

/**
 * Show all products in inventory
 */
Store.prototype.showAll = function() {
  conn.query(queries.SHOW_ALL, (err, results, fields) => {
    this.data = results;
    this.sell(this.data);
  });
};

/**
 * Print information with cli-table
 * @param {*} obj Array to be printed
 */
Store.prototype.sell = function(obj) {
  table.cli(["Item#", "Product", "Department", "Price$", "Qty"], obj);
  this.sellQuestions();
};

module.exports = Store;
