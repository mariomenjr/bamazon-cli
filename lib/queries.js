module.exports = {
	SHOW_ALL: "SELECT bp.*, bd.dept_name FROM bm_products bp LEFT JOIN bm_depts bd ON bp.dept_fk = bd.id",
	SHOW_LOW: "SELECT bp.*, bd.dept_name FROM bm_products bp LEFT JOIN bm_depts bd ON bp.dept_fk = bd.id WHERE bp.stock_qty <= 5",
	UPDATE_ITEM_STOCK: "UPDATE bm_products SET stock_qty = (stock_qty - ?) WHERE id = ?"
};