var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'bamazon_db'
})
connection.connect(function (err) {
    console.log(`Connected as id: ${connection.threadId}`);
});

var command = function () {
    inquirer.prompt([
        {
            name: 'command',
            message: 'What would you like to do today?',
            type: 'list',
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (answer) {
        switch (answer.command) {
            case "View Product Sales by Department":
                console.log("View Product Sales by Department")
                viewProductSales();
                break;

            case "Create New Department":
                console.log("Create New Department")
                newDept();
                break;
        }
    })
}

function viewProductSales() {
    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS Product_sales, SUM(products.product_sales) -departments.over_head_costs AS total_profit FROM products LEFT JOIN departments ON products.department = departments.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs;", function(err, res) {
        //console.log(res);

        for (i=0; i<res.length; i++) {
            console.log(`The total profit for ${res[i].department_name} is ${res[i].total_profit}`);
        }
    });
}; 

function newDept() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: 'What is the name of new department?'
        },
        {
            name: "overhead",
            type: "input",
            message: 'What is the overhead cost of the new department?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    ]).then(function(answer){
        connection.query( "INSERT INTO departments SET ?", 
    {
        department_name: answer.deptName,
        over_head_costs: answer.overhead,
    },
    function (err,res){
        if (err) throw err;
        console.log(`The new department, ${answer.deptName}, has been added!`);
    })
    })
}


command();

