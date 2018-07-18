const Store = require("./lib/store");
const Admin = require("./lib/admin");
const Args = require("./lib/args");

const store = new Store();
const admin = new Admin();
const args = new Args();

const options = args.resolve();

if (options.cmd === "store") {
  store.showAll();
} else if (options.cmd === "admin") {
  admin.options();
} else {
  console.log("Unknown command");
}