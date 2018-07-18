const CLITable = require("cli-table");

function Table() {}

Table.prototype.cli = function(heads, obj) {
	// instantiate
  var table = new CLITable({head: heads});

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  for (const key in obj) {
    const el = obj[key];
    table.push([el.id, el.product_name, el.dept_name, el.price, el.stock_qty]);
  }
  console.log(table.toString());
}

module.exports = new Table();