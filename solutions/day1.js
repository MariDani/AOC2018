module.exports = {

    getFirstStar: (i) => {
        i = prepareData(i);
        let sum = 0;
        i.forEach(element => {
            const number = Number(element);
            if (number) sum = sum + number;
            else console.log(`Error: value ${element} not converted to number`);
        });
        return sum;
    },


    getSecondStar: (i) => {
        i = prepareData(i);
        let sum = 0;

        let frequencies = new Array();
        frequencies.push(sum);

        let foundFrequency = false;
        let index = 0;

        while (!foundFrequency) {
            const number = Number(i[index]);
            if (number) {
                sum = sum + number;
                if (frequencies.includes(sum)) {
                    foundFrequency = true;
                }
                frequencies.push(sum);
            }
            else console.log(`Error: value ${i[index]} not converted to number`);
            index++;
            if (index >= i.length) {
                index = 0;
            }
        }
        return sum;
    }

};

function prepareData(i) {
    return i.split("\n");
}