const mysql = require("mysql");

const conn = mysql.createConnection({
	user: 'root',
	password: '',
	database: 'bamazon'
});
conn.connect();
	
module.exports = conn;