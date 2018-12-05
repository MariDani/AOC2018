module.exports = {

    getFirstStar: (i) => {
        for (let idx = 0; idx < i.length - 1; idx++) {
            let unitOne = getUnit(i.charAt(idx));
            let unitTwo = getUnit(i.charAt(idx + 1));

            if (unitOne.letter.toUpperCase() === unitTwo.letter.toUpperCase() && unitOne.upperCase != unitTwo.upperCase) {
                i = i.slice(0, idx) + i.slice(idx + 2);
                idx = -1;
            }
        }
        return i.length;
    },


    getSecondStar: (i) => {
        let unitTypes = getUnitTypes(i);

        Object.keys(unitTypes).forEach(type => {
            let iModified = i.slice();
            const regex = new RegExp(`[${type}, ${type.toLowerCase()}]`, "g");

            iModified = iModified.replace(regex, "");
            unitTypes[`${type}`] = module.exports.getFirstStar(iModified);

        });

        return getMinLength(unitTypes, i.length);
    }
};

function getUnit(letter) {
    return { letter: letter, upperCase: checkUppercase(letter) };
}


function checkUppercase(letter) {
    if (letter === letter.toUpperCase()) {
        return true;
    }
    else return false;
}


function getUnitTypes(i) {
    let unitTypes = {};
    for (let idx = 0; idx < i.length; idx++) {
        if (!unitTypes[`${i[idx].toUpperCase()}`]) {
            unitTypes[`${i[idx].toUpperCase()}`] = 0;
        }
    }
    return unitTypes;
}

function getMinLength(units, minLegth) {
    Object.values(units).forEach(length => {
        if (length < minLegth) minLegth = length;
    });
    return minLegth;
}