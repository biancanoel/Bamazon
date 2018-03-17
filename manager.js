var mysql = require('mysql');
var inquirer = require('inquirer');

var itemsLowStock = [];
//create a connection to mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'bamazon_db'
})
connection.connect(function (err) {
    console.log(`Connected as id: ${connection.threadId}`);
})

var command = function () {
    inquirer.prompt([
        {
            name: 'command',
            message: 'What would you like to do today?',
            type: 'list',
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answer) {
        switch (answer.command) {
            case "View Products for Sale":
                console.log("View Products for Sale")
                viewProducts();
                break;

            case "View Low Inventory":
                console.log("View Low Inventory")
                lowInventory();
                break;

            case "Add to Inventory":
                console.log("Add to Inventory");
                lowInventory(itemsLowStock, addInventory());
                break;

            case "Add New Product":
                console.log("Add New Product");
                newProduct();
                break;
        }
    })
}

command();

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        var availableProducts = [];
        res.forEach((element, index) => {
            console.log("------------------");
            console.log("FOR SALE:")
            console.log(`ItemID:${res[index].id}, Description: ${res[index].productName},  Price: ${res[index].price}`);
            availableProducts.push(res[index].productName)

        });
        connection.end();
    }); command();
}


function lowInventory() {
    //search query for all only products with inventory less than 5
    connection.query("SELECT * from products where quantity BETWEEN 0 and 5;", function (err, res) {
        if (err) { throw err };
        console.log("The following items have less than 5 units remaining in inventory")
        console.log("-----------------------");
        for (i = 0; i < res.length; i++) {
            console.log(`${res[i].productName}: only ${res[i].quantity} remaining.`)
            console.log("-----------------------");
            itemsLowStock.push(res[i].productName);
        } return itemsLowStock;
        //console.log(itemsLowStock); 
    });

};

function addInventory(itemsLowStock) {
    console.log(itemsLowStock);
    inquirer.prompt([
        {
            name: 'restock',
            message: 'Item would you like to restock?',
            type: 'list',
            choices: itemsLowStock
        }
    ])

    //console.log(itemsLowStock);
    //increase products.quantity for selected item


}



function newProduct() {
    inquirer.prompt([
        {
            name: "prodName",
            type: "input",
            message: 'What is the name of new product?'
        },
        {
            name: "prodDept",
            type: "input",
            message: 'What department does this belong in?'
        },
        {
            name: "price",
            type: "input",
            message: 'What is the price?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "quantity",
            type: "input",
            message: 'What is the quantity of this new product?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?", {
            productName: answer.prodName,
            department: answer.prodDept,
            price: answer.price,
            quantity: answer.quantity
        },
            function (err, res) {
                if (err) throw err;
                console.log(`Success! ${answer.prodName} has been added to the ${answer.prodDept} department at ${answer.quantity} quantity and the price is $${answer.price}.`)
            }
        ); connection.end();
    })

};