// function lazy_1 (callback) {
//     var x = 1+2;
//     console.log("first function gives "+  x);
//     return x;
//     callback();
// }

// function lazy_2 (y) {
//     console.log("second function gives: "+ y+1);   
// }

// lazy_1(lazy_2(x));

// function tryMe (param1, param2) {
//     console.log(param1 + " and " + param2);
// }


// function callbackTester (callback) {
//     callback (arguments[1], arguments[2]);
// }

// callbackTester (tryMe, "hello", "goodbye");


//this runs second

// var x;

// function tryMe (param1, param2) {
//     console.log(param1 + " and " + param2);
//     var y = x + 1; 
//     console.log(y);
// }

// //this function runs first. this is where the low inventory should be seen.
// function callbackTester (callback, param1, param2, ) {
//     console.log("this happens first");
//     x = 4+1;
//     callback (param1, param2, x);
// }

// //callbackTester();
// callbackTester (tryMe, "hello", "goodbye", x);

// console.log(“You are ordering  ” + data.updateItem +”   “+data.updateQuantity+”  quantity “);
//             var query=“UPDATE product SET stock_quantity = stock_quantity + ” +data.updateQuantity+ ” WHERE  ?“;
//             connection.query (query,
//                 [ {
//                     product_name  : data.updateItem
//                 }]