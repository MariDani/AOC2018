module.exports = {

    getFirstStar: (i) => {
        [samples, program] = prepareData(i);
        let instructions = getInstructions();

        let threeOrMore = 0;
        samples.forEach(sample => {
            let matchingOptcodes = 0;
            Object.entries(instructions).forEach(([name, instruction]) => {
                let result = instruction(sample.before, sample.optcode[1], sample.optcode[2], sample.optcode[3]);
                if (sample.after.join("") == result.join("")) {
                    matchingOptcodes++;
                }
            });
            if (matchingOptcodes >= 3) {
                threeOrMore++;
            }
        });
        return threeOrMore;
    },



    getSecondStar: (i) => {
        [samples, program] = prepareData(i);
        let instructions = getInstructions();

        let instructionNumber = new Array();

        // get instruction numbers  
        samples.forEach(sample => {
            let matchingOptcodes = new Array();
            if (!instructionNumber[sample.optcode[0]]) {
                Object.entries(instructions).forEach(([name, instruction]) => {

                    let result = instruction(sample.before, sample.optcode[1], sample.optcode[2], sample.optcode[3]);
                    if (sample.after.join("") == result.join("")) {
                        matchingOptcodes.push(name);
                    }
                });
            }

            // remove already defined instructions
            if (instructionNumber.length > 0 && matchingOptcodes.length > 1) {
                for (let idx = 0; idx < matchingOptcodes.length; idx++) {
                    if (instructionNumber.indexOf(matchingOptcodes[idx]) > -1) {
                        matchingOptcodes.splice(idx, 1);
                        idx--;
                    }
                }
            }
            // assing instruction
            if (matchingOptcodes.length == 1) {
                instructionNumber[sample.optcode[0]] = matchingOptcodes[0];
            }
        });


        // execute test program, assuming starting register values are 0
        let testRegister = [0, 0, 0, 0];
        program.forEach(pr => {
            testRegister = instructions[instructionNumber[pr[0]]](testRegister, pr[1], pr[2], pr[3]);
        });

        return testRegister[0];
    }
}


function getInstructions() {
    let instructions = {
        addr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] + register[B];
            return newRegister
        },
        addi: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] + B;
            return newRegister
        },
        mulr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] * register[B];
            return newRegister
        },
        muli: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] * B;
            return newRegister
        },
        banr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] & register[B];
            return newRegister
        },
        bani: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] & B;
            return newRegister
        },
        borr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] | register[B];
            return newRegister
        },
        bori: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] | B;
            return newRegister
        },
        setr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A];
            return newRegister
        },
        seti: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = A;
            return newRegister
        },
        gtir: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = A > register[B] ? 1 : 0;
            return newRegister
        },
        gtri: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] > B ? 1 : 0;
            return newRegister
        },
        gtrr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] > register[B] ? 1 : 0;
            return newRegister
        },

        eqir: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = A == register[B] ? 1 : 0;
            return newRegister
        },
        eqri: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] == B ? 1 : 0;
            return newRegister
        },
        eqrr: (register, A, B, C) => {
            let newRegister = register.slice();
            newRegister[C] = register[A] == register[B] ? 1 : 0;
            return newRegister
        }
    }
    return instructions;
}


function prepareData(i) {
    i = i.split("\r\n");
    const regex = /\d\d?\,?\s\d\,?\s\d\,?\s\d/s;

    let testProgram = false;
    let samples = new Array();
    let program = new Array();

    let idx = 0
    while (!testProgram && idx < i.length) {
        if (!regex.exec(i[idx])) {
            testProgram = true;
        }

        if (!testProgram) {
            let before = regex.exec(i[idx])[0].split(", ");
            let optcode = regex.exec(i[idx + 1])[0].split(" ");
            let after = regex.exec(i[idx + 2])[0].split(", ");

            samples.push({
                before: before.map(parseFloat),
                optcode: optcode.map(parseFloat),
                after: after.map(parseFloat)
            });
            idx = idx + 4;
        }

    }

    for (let tIdx = idx + 2; tIdx < i.length; tIdx++) {
        let _program = regex.exec(i[tIdx])[0].split(" ");
        program.push(_program.map(parseFloat));
    }

    return [samples, program];

}