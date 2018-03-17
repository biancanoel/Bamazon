var mysql = require('mysql');
var inquirer = require('inquirer');
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


var displayItems  = function() {
    
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        var availableProducts = [];
        res.forEach((element, index) => {
            console.log("------------------");
            console.log("FOR SALE:")
            console.log(`ItemID:${res[index].id}, Description: ${res[index].productName},  Price: ${res[index].price}`);
            availableProducts.push(res[index].productName)
            //console.log(availableProducts);
        });
        inquirer.prompt([
            {
                name: 'item',
                message: 'What item would you like to buy today?',
                type: 'list',
                choices: availableProducts
            }
        ]).then(function(answer){
            console.log(`You have chosen to purchase ${answer.item}!`);
            
            for (j=0; j<availableProducts.length; j++) {
                debugger;
                if (answer.item === res[j].productName) {
                    var chosenItem = res[j];
                } 
            };
            inquirer.prompt([
                {
                    name: 'quantity',
                    message: 'How many units would you like to buy?',
                    type: 'input',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            console.log("  !!Please input a valid # for the quantity of items to buy!!");
                            return false;
                        }
                    }
                }
            ]).then(function (answer){
                //If item is in stock for chosen quantity: 
                if (parseInt(answer.quantity) <= chosenItem.quantity ) {
                    console.log("The product is in stock!");
                    var newQuantity = parseInt(chosenItem.quantity) - parseInt(answer.quantity);
                    //Update the remaining stock in the db
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                //new quantity of selected item
                                quantity: newQuantity
                            },
                            {
                                //location of item to be updated
                                id: chosenItem.id
                            }
                        ]
                    );
                    //Show customer total price
                    var totalDue = parseInt(chosenItem.price)*parseInt(answer.quantity);
                    console.log(`Your total amount due is $ ${totalDue}`);

                } else {
                    console.log('sorry the item is out of stock :( ');
                }
                connection.end();
            })
        })
        
    });
    
}


displayItems();

module.exports()