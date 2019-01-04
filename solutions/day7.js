module.exports = {

    getFirstStar: (i) => {
        // https://hackernoon.com/breadth-first-search-in-javascript-e655cd824fa4
        const tree = getCoordinates(i);

        let queue = findRoots(tree);
        let results = "";

        while (queue.length > 0) {

            // sort queue
            queue.sort();

            // must check conditions before taking first element
            [_parent, queue] = getFirstQueueElem(results, tree, queue);
            
            results = results + _parent;

            // find children of the first element/parent and push them to queue
            let children = findChildren(_parent, tree);
            children.forEach(child => {
                if (queue.indexOf(child) < 0) {
                    queue.push(child);
                }
            });
        }
        return results;
    },


    getSecondStar: (i) => {

    }
};

function getFirstQueueElem(results, tree, queue) {
    let parentFound = false;
    let parent;
    let parentIdx = 0

    while (!parentFound && parentIdx < queue.length) {
        parent = queue[parentIdx];

        let conditionsFulfilled = true;
        let nodeIdx = 0;
        while (conditionsFulfilled && nodeIdx < tree.length) {
            if (tree[nodeIdx].edge[1] === parent && results.indexOf(tree[nodeIdx].edge[0]) < 0) {
                conditionsFulfilled = false;
            }
            nodeIdx++;
        }
        if (conditionsFulfilled) parentFound = true;

        parentIdx++;
    }
    queue.splice(queue.indexOf(parent), 1);
    return [parent, queue];
}

function findChildren(parent, tree) {
    let children = new Array();
    tree.forEach(node => {
        if (parent === node.edge[0]) {
            children.push(node.edge[1])
        }
    });
    return children;
}

function findRoots(tree) {
    let root = [];

    tree.forEach(_parent => {
        let foundParent = true;
        tree.forEach(_node => {
            if (_parent.vertex === _node.edge[1]){
                foundParent = false;
            }
        });
        if (foundParent && root.indexOf(_parent.vertex) < 0){
            root.push(_parent.vertex);
        }
    });

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