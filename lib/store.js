const Table = require("cli-table");
const Conn = require("./conn");

const inquirer = require("inquirer");

function Store() {
  this.conn = new Conn();
  this.conn.connect();
  
  this.data = [];
}

Store.prototype.sell = function() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the item# you'd like to purchase:",
        name: "id",
        validate: (input, hash) => {
          input = Number(input);
          return input>0 && this.data.map(e => e.id).indexOf(input)>=0;
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

Store.prototype.updateInventory = function(answers) {
  this.conn.query("UPDATE bm_products SET stock_qty = (stock_qty - ?) WHERE id = ?", [Number(answers.sale_qty), Number(answers.id)], (err, results, fields) => {
    this.continueShopping();
  });
}

Store.prototype.checkInventory = function(answers) {
  const selectedItem = Number(answers.id);
  const selectedQty = Number(answers.sale_qty);

  index = this.data.map(e => e.id).indexOf(selectedItem);
  if (index >= 0) {
    if (this.data[index].stock_qty >= selectedQty) {
      console.log(`\n\tYour total is ${selectedQty} x ${this.data[index].price} = $${selectedQty * this.data[index].price}\n`);
      this.updateInventory(answers);
    } else {
      console.log("Insufficient quantity!");
    }
  } else {
    console.log(`\n\tItem ${answers.id} is not an option being shown in the table.\n`);
    this.conn.end();
  }
};

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
        this.conn.end();
      }
    })
    .catch(err => {
      throw err;
    });
};

Store.prototype.showAll = function() {
  this.conn.query("SELECT bp.*, bd.dept_name FROM bm_products bp LEFT JOIN bm_depts bd ON bp.dept_fk = bd.id", (err, results, fields) => {
    this.data = results;
    this.cliPrint(this.data);
    // this.conn.end();
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
    table.push([el.id, el.product_name, el.dept_name, el.price, el.stock_qty]);
  }
  console.log(table.toString());
  this.sell();
};

module.exports = Store;
