
const functions = require("./solutions/day3.js");
const filename = "./input/day3.txt";

let promisedData = readData(filename);
promisedData.then(inputData => {
    const result = functions.getFirstStar(inputData);
    console.log(result);
});


function readData(filename) {
    return new Promise(resolve => {
        let fs = require("fs");

        fs.readFile(filename, "utf8", function (err, data) {
            if (err) throw err;
            resolve(data);
        });
    });
}


// argv
// write typescript functions and link them to node js