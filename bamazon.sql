DROP TABLE IF EXISTS bm_depts;
CREATE TABLE bm_depts(
	id INTEGER AUTO_INCREMENT,
    dept_name VARCHAR(255) NOT NULL,
    over_head_number DECIMAL(10, 0) DEFAULT 0.0,
    PRIMARY KEY(id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS bm_products;
CREATE TABLE bm_products(
	id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    dept_fk INTEGER,
    price DECIMAL(10, 2) DEFAULT 0.0,
    stock_qty DECIMAL(10, 2) DEFAULT 0.0,
    PRIMARY KEY(id),
    CONSTRAINT products_dept_fk FOREIGN KEY (dept_fk) REFERENCES bm_products(id)
)ENGINE=InnoDB;
