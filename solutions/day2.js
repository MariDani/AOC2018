module.exports = {

    getFirstStar: (i) => {
        i = prepareData(i);
        let appereanceTwo = 0;
        let appereanceThree = 0;

        i.forEach(id => {
            let foundTwo = false;
            let foundThree = false;
            let checkedLetters = "";

            for (let letterIdx = 0; letterIdx < id.length; letterIdx++) {

                const letter = id.charAt(letterIdx);

                // check if I haven't searched for this letter already
                if (checkedLetters.indexOf(letter) < 0) {

                    let appereance = 1;
                    let searchIdx = letterIdx + 1;

                    while (id.indexOf(letter, searchIdx) > 0) {
                        appereance = appereance + 1;
                        searchIdx = id.indexOf(letter, searchIdx) + 1;
                    }

                    if (appereance === 2 && !foundTwo) {
                        appereanceTwo++;
                        foundTwo = true;
                    }
                    else if (appereance === 3 && !foundThree) {
                        appereanceThree++;
                        foundThree = true;
                    }
                    checkedLetters = checkedLetters + letter;
                }
            }
        });

        return appereanceThree * appereanceTwo;
    },


    getSecondStar: (i) => {
        i = prepareData(i);
        i.sort();

        for (let firstIDidx = 0; firstIDidx < i.length - 2; firstIDidx++) {
            const firstID = i[firstIDidx];

            let secondIDidx = firstIDidx + 1;

            while (secondIDidx < i.length){
                let secondID = i[secondIDidx];

                let differCount = 0;
                let letterIdx = 0;
                while (differCount <= 1 && letterIdx < firstID.length){
                    if (firstID.charAt(letterIdx) !== secondID.charAt(letterIdx)){
                        differCount++;
                    }
                    letterIdx++;
                }
                if (differCount === 1){
                    return getCommonLetters(firstID, secondID)
                }
                secondIDidx++;
            }
        }
    }

};

function prepareData(i) {
    return i.split("\n");
}

function getCommonLetters(stringOne, stringTwo){
    let commonLetters = "";
    for (let idx = 0; idx < stringOne.length; idx++){
        if (stringOne.charAt(idx) === stringTwo.charAt(idx)){
            commonLetters = commonLetters + stringOne.charAt(idx);
        }
    }
    return commonLetters;
}