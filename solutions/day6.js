module.exports = {

    getFirstStar: (i) => {
        [coordinates, gridSize] = getCoordinates(i);
        let foundCoordinate = false;
        let foundCoordinates = new Array();

        gridSize[0]++;
        gridSize[1]++;


        let grid = new Array();
        coordinates.forEach((coord, idx) => {
            grid[coord[1] * gridSize[0] + coord[0]] = idx;
        })

        let areas = new Map();

        // for each grid place find the closest coordinate
        for (let row = 0; row < gridSize[1]; row++) {
            for (let col = 0; col < gridSize[0]; col++) {

                foundCoordinate = false;
                foundCoordinates = [];
                let distance = 1;

                findCoordinates(row, col);

                while (!foundCoordinate) {
                    // left
                    if ((col - distance) >= 0) {
                        findCoordinates(row, col - distance);
                    }
                    // right
                    if ((col + distance) < gridSize[0]) {
                        findCoordinates(row, col + distance);
                    }
                    // up
                    if ((row - distance) >= 0) {
                        findCoordinates(row - distance, col);
                    }
                    // down
                    if ((row + distance) < gridSize[1]) {
                        findCoordinates(row + distance, col);
                    }
                    let diagonalDist = 1;
                    while (distance - diagonalDist > 0) {
                        // down 
                        if (row + (distance - diagonalDist) < gridSize[1]) {
                            //  right 
                            if ((col + diagonalDist) < gridSize[0]) {
                                findCoordinates(row + (distance - diagonalDist), col + diagonalDist);
                            }
                            // left
                            if ((col - diagonalDist) >= 0) {
                                findCoordinates(row + (distance - diagonalDist), col - diagonalDist);
                            }
                        }
                        // up
                        if (row - (distance - diagonalDist) >= 0) {
                            // right
                            if ((col + diagonalDist) < gridSize[0]) {
                                findCoordinates(row - (distance - diagonalDist), col + diagonalDist);
                            }
                            //  left
                            if ((col - diagonalDist) >= 0) {
                                findCoordinates(row - (distance - diagonalDist), col - diagonalDist);
                            }
                        }
                        diagonalDist++;
                    }
                    distance++;

                }
                if (foundCoordinates.length === 1) {
                    if (!areas.has(foundCoordinates[0])) {
                        areas.set(foundCoordinates[0], { infinite: isInfinite(row, col), size: 1 });
                    }
                    else {
                        if (!areas.get(foundCoordinates[0]).infinite) {
                            areas.get(foundCoordinates[0]).infinite = isInfinite(row, col);
                        }
                        areas.get(foundCoordinates[0]).size++;
                    }
                }
            }
        }

        let maxFiniteArea = 0;
        areas.forEach(area => {
            if (!area.infinite && area.size > maxFiniteArea) {
                maxFiniteArea = area.size;
            }
        })
        return maxFiniteArea;


        function findCoordinates(row, col) {
            if (grid[row * gridSize[0] + col] != undefined) {
                foundCoordinates.push(grid[row * gridSize[0] + col]);
                foundCoordinate = true;
            }
        }

        function isInfinite(row, col) {
            if (row == 0 || row == gridSize[1] - 1 || col == 0 || col == gridSize[0] - 1) {
                return true;
            }
            else return false;
        }
    },


    getSecondStar: (i) => {
        [coordinates, gridSize] = getCoordinates(i);

        gridSize[0]++;
        gridSize[1]++;

        let size = 0;

        for (let row = 0; row < gridSize[1]; row++) {
            for (let col = 0; col < gridSize[0]; col++) {
                let distances = 0;
                coordinates.forEach(coordinate => {
                    distances += Math.abs(col - coordinate[0]) + Math.abs(row - coordinate[1]);
                });
                if (distances < 10000) {
                    size++;
                }
            }
        }
        return size;
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
        coordinates.push([x, y]);
    });

    return [coordinates, gridSize];
}