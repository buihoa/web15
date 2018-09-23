/* console.log("Hello World");

//function thi co de goi o bat cu dau; variable attached function thi chi duoc goi sau khi declare

function aFunction() {
    console.log("Hello Nam!");
}

var bFunction = function() {
    console.log("Hello Huy!");
}

bFunction();

var cVariable = aFunction;
cVariable();

var dFunction = () => {
    console.log("Hello Arrow Function. Only in ES6");
}

dFunction();

eFunction("Hi, I'm passed!");

function eFunction(a) {
    console.log("Parameter: " + a);
} 

//Callback
function add5(getNumber, print) {
    var num = getNumber() + 5;
    print(num);
}

function randomNumber() {
    return Math.floor(Math.random() * 1000);
}

function printNumber(num) {
    console.log(num);
}

add5(randomNumber, printNumber);
*/


/* setTimeout(function() {
    console.log("3 second: ")},1000*3);
 */


function printNum(num, waitTime) {
    setTimeout(function() {
        console.log(num);
    }, waitTime*1000);
}

function countDown(num) {
    var i = num;
    for(i; i >= 0; i--) {
        printNum(i, num - i );
    }
}

countDown(5); 

/* function countDown(num) {
    for(let i = num; i >= 0 ; i--) {
        setTimeout(function () {
            console.log(i);
        }, num * 1000);
    }
}
 */
// Example for the */ scope and does not run -- block scope
/* function countDown(num) {
    for(var i = num; i >= 0 ; i--) {
        setTimeout(function () {
            console.log(i);
        }, num * 1000);
    }
} */

/* function myFunc(arg) {
    console.log(`arg was => ${arg}`);
  }
  
  setTimeout(myFunc, 1500, 'funky'); */