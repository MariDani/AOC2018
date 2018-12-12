module.exports = {

    getFirstStar: (i) => {
        let plants = prepareData(i);

        let genCount = 1;
        while (genCount <= 20) {
            plants = getNextGeneration(plants);
            genCount++;
        }

        return getPotNum(plants)
    },


    getSecondStar: (i) => {
        let plants = prepareData(i);

        let genCount = 1;
        let sum1000;
        // not the best solution....
        while (genCount <= 1001) {
            plants = getNextGeneration(plants);
            if (genCount === 1000) {
                sum1000 = getPotNum(plants);
            }
            genCount++;
        }

        let sum1001 = getPotNum(plants);
        return (50000000000 - 1000) * (sum1001 - sum1000) + sum1000;


    }
};

function getPotNum(plants) {
    let potNumbers = 0;
    let index = 0;
    while (plants.plantsState.indexOf("#", index) > -1) {
        const _plantIdx = plants.plantsState.indexOf("#", index)
        potNumbers = potNumbers + _plantIdx - plants.zeroIndex;
        index = _plantIdx + 1;

    }
    return potNumbers;
}

function getNextGeneration(plants) {
    plants = expandPlants(plants);

    let newPlants = plants.plantsState.substr(0, 2);

    for (let idx = 2; idx < plants.plantsState.length - 2; idx++) {

        let foundMatch = false;
        let subPlant = plants.plantsState.substr(idx - 2, 5);
        let noteIdx = 0;
        while (!foundMatch && noteIdx < plants.spreadNotes.length) {
            if (plants.spreadNotes[noteIdx][0] === subPlant) {
                foundMatch = true;
            }
            else {
                noteIdx++;
            }
        }
        if (!foundMatch) {
            newPlants = newPlants + ".";
        }
        else {
            newPlants = newPlants + plants.spreadNotes[noteIdx][1];
        }
    }
    plants.plantsState = newPlants + plants.plantsState.substr(plants.plantsState.length - 2, 2);
    return plants;
}

function expandPlants(p) {
    for (let idx = 0; idx < 3; idx++) {
        p.plantsState = "." + p.plantsState + ".";
        p.zeroIndex++;
    }
    return p;
}


function prepareData(i) {
    i = i.split("\n");


    const plantRegex = /initial state:\s([\#|\.]*)/g;
    const plants = plantRegex.exec(i[0]);

    let plantsState = plants[1];

    const spreadRegex = /([\#|\.]*)\s\=\>\s([\#|\.])/s;

    let spreadNotes = new Array();

    i.forEach(row => {
        let note = spreadRegex.exec(row);
        if (note) {
            spreadNotes.push([note[1], note[2]]);
        }
    });

    return {
        plantsState: plantsState,
        zeroIndex: 0,
        spreadNotes: spreadNotes
    }
}