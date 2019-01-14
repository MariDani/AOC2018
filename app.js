const fs = require("fs");

const fPath = require("./solutions/day16.js");
const inputPath = "./input/day16.txt";
const fName = "getSecondStar";

let promisedData = readData(inputPath);
promisedData.then(inputData => {
    const result = fPath[`${fName}`](inputData);
    console.log(result);
});

function readData(inputPath) {
    return new Promise(resolve => {

        fs.readFile(inputPath, "utf8", function (err, data) {
            if (err) throw err;
            resolve(data);
        });
    });
}