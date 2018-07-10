const Table = require("cli-table");

const Conn = require("./conn");

function Store() {
  this.conn = new Conn();
}

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
};

module.exports = Store;
