const mysql = require("mysql");

function Conn() {
	const conn = mysql.createConnection({
		user: 'root',
		password: '',
		database: 'bamazon'
	});
	return conn;
}

module.exports = Conn