module.exports = {

    getFirstStar: (i) => {
        [coordinates, gridSize] = getCoordinates(i);


        let grid = new Array();
        coordinates.forEach((coord, idx) => {
            grid[coord[1] * gridSize[0] + coord[0]] = idx;
        })

        let gridDist = new Array();
        // for each grid place find the closest coordinate
        for (let row = 0; row < gridSize[1]; row++) {
            for (let col = 0; col < gridSize[0]; col++) {

                let foundCoordinate = false;
                foundCoordinates = new Array();
                let distance = 1;

                while (!foundCoordinate) {
                    // left
                    if ((col - distance) > 0) {
                        debugger
                    }
                    // right
                    if ((col + distance) < gridSize[0]) {
                        if (grid[row * gridSize[0] + (col + distance)]) {
                            foundCoordinates.push(grid[row * gridSize[0] + col]);
                            foundCoordinate = true;
                        }
                    }
                    // up
                    if ((row - distance) > 0) {
                        debugger
                    }
                    // down
                    if ((row + distance) < gridSize[1]) {
                        if (grid[(row + distance) * gridSize[0] + col]) {
                            foundCoordinates.push(grid[row * gridSize[0] + col]);
                            foundCoordinate = true;
                        }
                    }
                    debugger
                    distance++;

                }
                debugger
            }
        }
        debugger
    },


    getSecondStar: (i) => {

    }
};

function getCoordinates(i) {
    i = i.split("\n");

    const regex = /(\d*),\s(\d*)/s;

    let coordinates = new Array();
    let gridSize = [0, 0];

    i.forEach(row => {
        let coordinate = regex.exec(row);
        const x = parseFloat(coordinate[1])
        const y = parseFloat(coordinate[2]);
        if (x > gridSize[0]) {
            gridSize[0] = x;
        }
        if (y > gridSize[1]) {
            gridSize[1] = y;
        }
        coordinates.push([x, y])
    });
    return [coordinates, gridSize];

}