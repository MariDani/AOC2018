module.exports = {

    getFirstStar: (i) => {
        let cells = getFuelCellPowers(i);

        // calculate largest fuel 3x3 area
        let largestFuelArea = getLargestFuelArea(3, cells);

        return largestFuelArea.coord;
    },


    getSecondStar: (i) => {

        let cells = getFuelCellPowers(i);

        let largestFuelArea = { coord: [], fuelSum: 0, size: 0 };

        let size = 1;
        while (size <= 300){
            let _largestFuelArea = getLargestFuelArea(size, cells);
            if (_largestFuelArea.fuelSum > largestFuelArea.fuelSum){
                largestFuelArea = { 
                    coord: _largestFuelArea.coord, 
                    fuelSum: _largestFuelArea.fuelSum, 
                    size: size 
                };
            }
            size++;
        }
        return [largestFuelArea.coord[0], largestFuelArea.coord[1], largestFuelArea.fuelSum, largestFuelArea.size];

    }
};

function getLargestFuelArea(size, cells) {
    let largestFuelArea = { coord: [], fuelSum: 0 };

    for (let row = 0; row < 300 - size - 1; row++) {
        for (let col = 0; col < 300 - size - 1; col++) {
            let _fuelSum = getFuelSum(col, row, size);
            if (_fuelSum > largestFuelArea.fuelSum) {
                largestFuelArea.fuelSum = _fuelSum;
                largestFuelArea.coord = [col + 1, row + 1];
            }
        }
    }

    return largestFuelArea;

    function getFuelSum(col, row, size) {
        let fuelSum = 0;
        for (let areaRow = row; areaRow < row + size; areaRow++) {
            for (let areaCol = col; areaCol < col + size; areaCol++) {
                fuelSum = fuelSum + cells[areaRow * 300 + areaCol]
            }
        }
        return fuelSum;
    }
}


function getFuelCellPowers(i) {
    const serialNum = parseFloat(i);
    let cells = new Array(300 * 300);

    for (let row = 0; row < 300; row++) {
        for (let col = 0; col < 300; col++) {
            const _fuel = getFuelPower(col + 1, row + 1, serialNum);
            cells[row * 300 + col] = _fuel;
        }
    }

    return cells;
}


function getFuelPower(x, y, serialNum) {
    const rackID = x + 10;
    let fuelPower = (rackID * y + serialNum) * rackID;
    return getHundreds(fuelPower) - 5;
}


function getHundreds(num) {
    let numString = num.toString();
    const hundreds = parseFloat(numString.charAt(numString.length - 3));
    if (hundreds === isNaN) {
        return 0
    }
    else return hundreds
}

