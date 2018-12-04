module.exports = {

    getFirstStar: (i) => {
        i = prepareData(i);
        let fabric = new Array(1000 * 1000);

        i.forEach(claim => {
            // width * y + x
            
        })


        debugger

    },


    getSecondStar: (i) => {
        i = prepareData(i);

    }

};

function prepareData(i) {

    i = i.split("\n");

    let splitData = new Array(i.length);

    const regex = /#(\d*)\s@\s(\d*),(\d*):\s(\d*)x(\d*)/g;

    i.forEach((row, index) => {
        let a = regex.exec(row);
        if (a){
            splitData[index] = {
                x: a[2],
                y: a[3],
                w: a[4],
                h: a[5]
            }
        }
       

    });
    debugger
    return splitData

}