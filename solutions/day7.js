module.exports = {

    getFirstStar: (i) => {
        // https://hackernoon.com/breadth-first-search-in-javascript-e655cd824fa4
        const tree = getCoordinates(i);
        const root = findRoot(tree);
        
        let queue =[root];
        let results = "";

        while (queue.length > 0){
            debugger
            // sort queue
            queue.sort();

            // TO DO: must check conditions before taking first element

            //  take first element and push it to results
            const _parent = queue.shift()
            results = results + _parent;

            // find children of the first element/parent and push them to queue
            let children = findChildren(_parent, tree);
            children.forEach(child => {
                if (queue.indexOf(child) <0) {
                    queue.push(child);
                }
            });
        }

    },


    getSecondStar: (i) => {

    }
};

function findChildren(parent, tree) {
    let children = new Array();
    tree.forEach(node => {
        if (parent === node.edge[0]){
            children.push(node.edge[1])
        }
    });
    return children;
}

function findRoot(tree) {
    let foundRoot = false;
    let vertexIdx = 0;
    let root;

    while (!foundRoot) {

        let foundVertex = false;
        let edgeIdx = 0

        while (!foundVertex && edgeIdx < tree.length) {
            if (tree[vertexIdx].vertex === tree[edgeIdx].edge[1]) {
                foundVertex = true;
            }
            edgeIdx++;
        }
        if (!foundVertex) {
            foundRoot = true;
            root = tree[vertexIdx].vertex;
        }
        vertexIdx++;
    }
    return root;
}

function getCoordinates(i) {
    i = i.split("\n");
    const regex = /Step (\w) must be finished before step (\w) can begin./s;

    let tree = new Array();

    i.forEach(row => {
        let _node = regex.exec(row);
        tree.push({
            vertex: _node[1],
            edge: [_node[1], _node[2]]
        })
    });

    return tree;
}