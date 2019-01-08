module.exports = {

    getFirstStar: (i) => {
        let nodes = createTree(convertToFloats(i));

        let metadataSum = 0;
        nodes.forEach(node => {
            metadataSum = metadataSum + node.metadata.reduce((a, b) => a + b, 0)
        });
        return metadataSum;
    },


    getSecondStar: (i) => {
        // https://hackernoon.com/breadth-first-search-in-javascript-e655cd824fa4
        let nodes = createTree(convertToFloats(i));

        let queue = [0];
        let result = 0;

        while (queue.length > 0) {
            let _parent = nodes[queue.shift()];
            if (_parent.children === 0) {
                result = result + _parent.metadata.reduce((a, b) => a + b, 0)
            }
            else {
                _parent.metadata.forEach(reference => {
                    reference = reference - 1;
                    if (_parent.childrenList[reference]) {
                        queue.push(_parent.childrenList[reference])
                    }
                })
            }
        }
        return result;
    }
};

function createTree(i) {

    let nodes = new Array();
    let nodeIdx = 0;

    getNextNode();

    while (i.length > 0) {
        nodeIdx++;
        getNextNode();
        createEdge(nodeIdx);

        let metaIdx = nodeIdx;
        while (metaIdx >= 0 && nodes[metaIdx].missingChildren === 0) {
            // if metadata hasn't been defined yet
            if (!nodes[metaIdx].metadata) {
                nodes[metaIdx].metadata = new Array();
                for (let idx = 0; idx < nodes[metaIdx].metadataCount; idx++) {
                    nodes[metaIdx].metadata.push(i.shift());
                }
            }
            metaIdx--;
        }
    }

    return nodes;


    function createEdge(childId) {
        // find parent
        let parentId;
        let idx = nodes.length - 2
        while (!parentId && idx >= 0) {
            if (nodes[idx].missingChildren > 0) {
                parentId = idx;
            }
            idx--;
        }

        nodes[parentId].missingChildren--;
        nodes[parentId].childrenList.push(childId);
    }


    function getNextNode() {
        const children = i.shift();
        const metadata = i.shift();

        let _node = {
            id: nodeIdx,
            children: children,
            missingChildren: children,
            childrenList: new Array(),
            metadataCount: metadata
        }
        nodes.push(_node);
    }
}


function convertToFloats(i) {
    let floats = new Array();

    i = i.split(" ");
    i.forEach(element => {
        floats.push(parseFloat(element));
    });

    return floats;
}
