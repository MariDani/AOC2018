module.exports = {

    getFirstStar: (i) => {
        i = prepareData(i);
        let results = setClaimes(i, 1000);

        let overlap = 0;
        results.fabric.forEach(inch => {
            if (inch) {
                overlap = overlap + inch.claimed;
            }
        });

        return overlap;
    },


    getSecondStar: (i) => {
        i = prepareData(i);
        let results = setClaimes(i, 1000);

        let notClaimedID;
        results.claims.forEach(claim => {
            if (!claim.overlap) {
                notClaimedID = claim.id;
            }
        });
        return notClaimedID;
    }

};

function prepareData(i) {

    i = i.split("\n");

    let splitInput = new Array(i.length);

    const regex = /#(\d*)\s@\s(\d*),(\d*):\s(\d*)[x](\d*)/s;

    i.forEach((row, index) => {
        let claim = regex.exec(row);
        splitInput[index] = { id: parseFloat(claim[1]), x: parseFloat(claim[2]), y: parseFloat(claim[3]), w: parseFloat(claim[4]), h: parseFloat(claim[5]), overlap: false }

    });

    return splitInput;
}


function setClaimes(i, fabricSize) {

    let fabric = createFabric(fabricSize)

    i.forEach(claim => {
        for (let row = claim.y; row < claim.y + claim.h; row++) {
            for (let col = claim.x; col < claim.x + claim.w; col++) {

                //  check if the current inch has been claimed - this is an overlapp
                if (fabric[col + row * fabricSize]) {
                    //  change the inch claimed status to 1 - claimed multiple times
                    fabric[col + row * fabricSize].claimed = 1;
                    //  assign ID to used inch
                    fabric[col + row * fabricSize].claimIDs.push(claim.id);
                    // change all claims in this inch as overlap
                    fabric[col + row * fabricSize].claimIDs.forEach(claimID => {
                        i[claimID - 1].overlap = true;
                    });
                }
                else {
                    //  change the inch claimed status to 0 - claimed once
                    fabric[col + row * fabricSize] = { claimIDs: [claim.id], claimed: 0 }
                }
            }
        }
    });

    return { claims: i, fabric: fabric };
}



function createFabric(size) {
    return new Array(size * size);
}