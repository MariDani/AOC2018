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
        // https://hackernoon.com/breadth-first-search-in-javascript-e655cd824fa4
        const tree = getCoordinates(i);

        let queue = findRoots(tree);
        let results = "";

        let workers = createWorkers(5);        
        let second = -1;
        let workFinsihed = false;

        while (!workFinsihed) {
            second++;

            // update remaining step counts for worker's assignments
            workers.forEach(w => {
                if (w.stepName) {
                    w.stepCount--;
                }
                if (w.stepCount === 0) {
                    results = results + w.stepName;

                    // find children of the first element/parent and push them to queue
                    let children = findChildren(w.stepName, tree);
                    children.forEach(child => {
                        if (queue.indexOf(child) < 0) {
                            queue.push(child);
                        }
                    });

                    w.stepCount = -1;
                    w.stepName = undefined;
                }
            });

            // sort queue
            queue.sort();

            workers.forEach(w => {
                if (!w.stepName && queue.length > 0) {
                    // must check conditions before assigning step
                    [w.stepName, queue] = getFirstQueueElem(results, tree, queue);
                    // assing number of steps
                    if (w.stepName) {
                        w.stepCount = getStepCount(w.stepName);
                    }
                }
            });

            workFinsihed = isWorkFinished(workers);

        }
        return second;
    }
};


function createWorkers(workersCount){
    let workers = new Array();
    while (workersCount > 0) {
        workers.push({ stepName: undefined, stepCount: -1 });
        workersCount--;
    }
    return workers;
}


function isWorkFinished(workers) {
    let workFinsihed = true;
    workers.forEach(w => {
        if (w.stepName) workFinsihed = false;
    })
    return workFinsihed;
}


function getStepCount(letter) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.indexOf(letter.toLowerCase()) + 1 + 60;
}


function getFirstQueueElem(results, tree, queue) {
    let parentFound = false;
    let hasParent = false;
    let parent;
    let parentIdx = 0

    while (!parentFound && parentIdx < queue.length) {
        parent = queue[parentIdx];

        let conditionsFulfilled = true;
        let nodeIdx = 0;
        while (conditionsFulfilled && nodeIdx < tree.length) {
            if (tree[nodeIdx].edge[1] === parent) {

                if (results.indexOf(tree[nodeIdx].edge[0]) < 0) {
                    conditionsFulfilled = false;
                }

                hasParent = true;
            }
            nodeIdx++;
        }
        if (conditionsFulfilled) parentFound = true;

        parentIdx++;
    }
    if (parentFound || !hasParent) {
        queue.splice(queue.indexOf(parent), 1);
        return [parent, queue];
    }
    else {
        return [undefined, queue];
    }

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
            if (_parent.vertex === _node.edge[1]) {
                foundParent = false;
            }
        });
        if (foundParent && root.indexOf(_parent.vertex) < 0) {
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