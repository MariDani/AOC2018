module.exports = {

    getFirstStar: (i) => {
        [lights, gridSize] = prepareData(i)
        let seconds = 0;
        let printed = false;

        while (seconds < 50000 && !printed) {
            [lights, gridSize, printed] = showStars(lights, gridSize, printed);
            seconds++;
        }
    },


    getSecondStar: (i) => {
        [lights, gridSize] = prepareData(i)
        let seconds = 0;
        let printed = false;

        while (seconds < 50000 && !printed) {
            [lights, gridSize, printed] = showStars(lights, gridSize, printed);
            if (printed) {
                return seconds
            }
            seconds++;
        }
    }
};

function showStars(lights, g, printed) {

    let oldLights = new Array();

    let newGridSize = {
        minX: 10,
        maxX: -10,
        minY: 10,
        maxY: -10
    };


    lights.forEach(light => {
        // remember old sky
        oldLights.push(light.p.slice());

        // move stars
        light.p[0] = light.p[0] + light.v[0];
        light.p[1] = light.p[1] + light.v[1];

        // update grid
        if (light.p[0] > newGridSize.maxX) newGridSize.maxX = light.p[0];
        else if (light.p[0] < newGridSize.minX) newGridSize.minX = light.p[0];
        if (light.p[1] > newGridSize.maxY) newGridSize.maxY = light.p[1];
        else if (light.p[1] < newGridSize.minY) newGridSize.minY = light.p[1];
    });

    const oldSize = (Math.abs(g.minY) + g.maxY + 1) * (Math.abs(g.minX) + g.maxX + 1);
    const newSize = (Math.abs(newGridSize.minY) + newGridSize.maxY + 1) * (Math.abs(newGridSize.minX) + newGridSize.maxX + 1)

    // show stars
    if (newSize > oldSize) {

        let sky = new Array(Math.abs(g.minY) + g.maxY + 1);
        for (let idx = 0; idx < sky.length; idx++) {
            sky[idx] = new Array(Math.abs(g.minX) + g.maxX + 1);
            sky[idx].fill(".");
        }

        oldLights.forEach(light => {
            const row = light[1] + Math.abs(g.minY);
            const col = light[0] + Math.abs(g.minX);
            sky[row][col] = "#"
        });

        sky.forEach(row => {
            console.log(row.join(""));
        });
        printed = true;
    }

    return [lights, newGridSize, printed];
}


function prepareData(i) {
    i = i.split("\n");

    const regex = /position=<(.*?\d*),(.*?\d*)> velocity=<(.*?\d*),(.*?\d*)>/s;

    let lights = new Array();
    let gridSize = {
        minX: 10,
        maxX: -10,
        minY: 10,
        maxY: -10
    };

    i.forEach(row => {
        let elem = regex.exec(row);

        x = parseFloat(elem[1]);
        y = parseFloat(elem[2]);

        const light = {
            p: [x, y],
            v: [parseFloat(elem[3]), parseFloat(elem[4])]
        };
        if (x > gridSize.maxX) gridSize.maxX = x;
        else if (x < gridSize.minX) gridSize.minX = x;
        if (y > gridSize.maxY) gridSize.maxY = y;
        else if (y < gridSize.minY) gridSize.minY = y;
        lights.push(light);
    });

    return [lights, gridSize];
}