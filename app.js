const fs = require("fs");

// const argv = require("yargs") 
//     .usage("Get AOC2018 solutions")
//     .help("help").alias("help", "h")
//     .options({
//         day: { description: "Day number", requiresArg: true, required: true },
//         function: { description: "Function name (for ex. getFirstStar, getSecondStar)", requiresArg: true, required: true }
//     })
//     .argv;

// const fPath = require(`./solutions/day${argv.day}.js`);
// const inputPath = `./input/day${argv.day}.txt`;
// const fName = argv.function;

const fPath = require("./solutions/day5.js");
const inputPath = "./input/day5.txt";
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


// write typescript functions and link them to node js