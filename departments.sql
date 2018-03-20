USE bamazon_db;

CREATE TABLE departments (
	department_id INT PRIMARY KEY NOT NULL,
    department_name  VARCHAR(100) NOT NULL,
    over_head_costs INT NOT NULL    
);


CREATE TABLE products (
	item_id  INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (item_id),
	productName VARCHAR(50), 
	department VARCHAR(50),
	price DECIMAL(50,2),
	quantity INTEGER,
	product_sales DECIMAL(10,2)
);

INSERT INTO products (productName, department, price, quantity, product_sales)
VALUES ("Ketchup", "Fruit", 5, 20, 20), ("Milk","Drinks", 3.4,  11, 20), ("coffee","Drinks", 6.9, 46, 20), ("Apples","Fruit", 0.99, 358, 20), ("Pinapple","Fruit", 11.67, 9, 20), ("Beer","Drinks", 4.5, 41, 20), ("Wine","Drinks", 17.8, 21, 20), ("Tomatoes","Vegetables", 1.3, 67, 20), ("Lemon","Fruit", 11.4, 34, 20), ("Pepper","Vegetables", 6.2, 11, 20);