module.exports = {

    getFirstStar: (i) => {
        let guardList = prepareData(i);

        let longSleepGuard = { id: 0, sumTime: 0 };

        guardList.forEach((times, id) => {
            const sumTime = times.reduce((sum, time) => sum + time);
            if (sumTime > longSleepGuard.sumTime) {
                longSleepGuard.id = id;
                longSleepGuard.sumTime = sumTime;
            }
        });

        const longSleepTimes = guardList.get(longSleepGuard.id);
        return longSleepGuard.id * longSleepTimes.indexOf(Math.max(...longSleepTimes));

    },


    getSecondStar: (i) => {
        let guardList = prepareData(i);

        let frequentSleepGuard = { id: 0, maxTime: 0 };
        guardList.forEach((times, id) => {
            const maxTime = Math.max(...times)
            if (maxTime > frequentSleepGuard.maxTime) {
                frequentSleepGuard.id = id;
                frequentSleepGuard.maxTime = maxTime;
            }
        });

        const frequentSleepTimes = guardList.get(frequentSleepGuard.id);
        return frequentSleepGuard.id * frequentSleepTimes.indexOf(frequentSleepGuard.maxTime);
    }

};

function prepareData(i) {

    i = i.split("\n");
    i.sort();

    const regex = /\[\d{4}-(\d{2}-\d{2})\s(\d{2}):(\d{2})]\s([^#\n]*)\s#?(\d*)?/s;

    let currentGuard;
    let guardList = new Map();

    i.forEach(row => {
        let record = regex.exec(row);

        // record[5] is guard's ID
        if (record[5]) {
            currentGuard = parseFloat(record[5]);
            if (!guardList.has(currentGuard)) {
                let time = new Array(60);
                time.fill(0);
                guardList.set(currentGuard, time)
            }

        }
        // record[4] is guard's activity
        else if (record[4].includes("falls")) {
            const startMinute = getStartMinute(record[2], record[3]);       // record[2] is hour, record[3] is minute
            for (let idx = startMinute; idx < 60; idx++) {
                guardList.get(currentGuard)[idx]++;
            }
        }
        else if (record[4].includes("wakes")) {
            const startMinute = getStartMinute(record[2], record[3]);       // record[2] is hour, record[3] is minute
            for (let idx = startMinute; idx < 60; idx++) {
                if (guardList.get(currentGuard)[idx] > 0) {
                    guardList.get(currentGuard)[idx]--;
                }
            }
        }
        else console.log("Warning: Wrong record");
    });

    return guardList;
}


function getStartMinute(hour, minute) {
    let startMinute;
    if (hour === "00") {
        startMinute = parseFloat(minute);
    }
    else startMinute = 0;
    return startMinute;
}
