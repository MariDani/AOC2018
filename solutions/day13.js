module.exports = {

    getFirstStar: (i) => {
        [map, carts, cartCount] = prepareData(i);

        let colision;

        while (!colision) {

            for (let row = 0; row < carts.length; row++) {
                for (let col = 0; col < carts[0].length; col++) {

                    let cart = carts[row][col];

                    if (cart && !cart.moved) {

                        // turn
                        if (map[row][col] === "/" || map[row][col] === "\\") {
                            cart.direction = turnCart(map[row][col], cart.direction);
                        }

                        //  intesection
                        else if (map[row][col] === "+") {
                            cart = changeDirection(cart);
                        }

                        // colisoin
                        if (!colision) {
                            colision = checkForColision(carts, row, col, cart.direction);
                        }

                        moveCart(cart.direction, carts, cart, row, col);
                    }
                }
            }
            carts = prepareforNewTick(carts);
        }
        return colision;
    },


    getSecondStar: (i) => {
        [map, carts, cartCount] = prepareData(i);

        while (cartCount > 1) {

            for (let row = 0; row < carts.length; row++) {
                for (let col = 0; col < carts[0].length; col++) {

                    let colide = false;

                    let cart = carts[row][col];

                    if (cart && !cart.moved) {

                        // turn
                        if (map[row][col] === "/" || map[row][col] === "\\") {
                            cart.direction = turnCart(map[row][col], cart.direction);
                        }

                        //  intesection
                        else if (map[row][col] === "+") {
                            cart = changeDirection(cart);
                        }

                        // colisoin
                        if (cartCount > 1) {
                            [cartCount, colide] = removeColidedCarts(carts, row, col, cart.direction, cartCount, colide);
                        }

                        if (!colide) {
                            moveCart(cart.direction, carts, cart, row, col);
                        }

                    }
                }
            }
            carts = prepareforNewTick(carts);
        }

        return getCoordinatesOfLast(carts);
    }
};


function moveCart(direction, carts, cart, row, col) {
    //  go right
    if (direction === 4) {
        carts[row][col + 1] = cart;
        cart.moved = true;
        carts[row][col] = undefined;
    }
    // go down
    else if (direction === 1) {
        carts[row + 1][col] = cart;
        cart.moved = true;
        carts[row][col] = undefined;
    }

    // go up
    else if (direction === 3) {
        carts[row - 1][col] = cart;
        cart.moved = true;
        carts[row][col] = undefined;
    }

    // go left
    else if (direction === 2) {
        carts[row][col - 1] = cart;
        cart.moved = true;
        carts[row][col] = undefined;
    }
}


function turnCart(turnSign, direction) {
    //  turn left
    if ((turnSign === "/" && direction === 4) ||
        (turnSign === "\\" && direction === 3) ||
        (turnSign === "/" && direction === 2) ||
        (turnSign === "\\" && direction === 1)) {
        return direction - 1 != 0 ? direction - 1 : 4;
    }

    // turn right
    else if ((turnSign === "\\" && direction === 4) ||
        (turnSign === "/" && direction === 3) ||
        (turnSign === "\\" && direction === 2) ||
        (turnSign === "/" && direction === 1)) {
        return direction + 1 != 5 ? direction + 1 : 1;
    }
}

function getCoordinatesOfLast(carts) {
    for (let row = 0; row < carts.length; row++) {
        for (let col = 0; col < carts[0].length; col++) {
            if (carts[row][col]) {
                return [col, row];
            }
        }
    }
}


function changeDirection(cart) {

    //  turn left
    if (cart.intersect === 1) {
        cart.direction = cart.direction - 1 != 0 ? cart.direction - 1 : 4;
    }
    //  turn right
    else if (cart.intersect === 3) {
        cart.direction = cart.direction + 1 != 5 ? cart.direction + 1 : 1;
    }

    cart.intersect++;
    if (cart.intersect > 3) cart.intersect = 1;

    return cart;
}

function removeColidedCarts(carts, row, col, direction, cartCount, colide) {


    // down 
    if (direction === 1) {
        if (carts[row + 1][col]) {
            carts[row + 1][col] = undefined;
            carts[row][col] = undefined;
            cartCount = cartCount - 2;
            colide = true;
        }
    }
    // left
    else if (direction === 2) {
        if (carts[row][col - 1]) {
            carts[row][col - 1] = undefined;
            carts[row][col] = undefined;
            cartCount = cartCount - 2;
            colide = true;
        }
    }
    // up
    else if (direction === 3) {
        if (carts[row - 1][col]) {
            carts[row - 1][col] = undefined;
            carts[row][col] = undefined;
            cartCount = cartCount - 2;
            colide = true;
        }
    }
    // right
    else if (direction === 4) {
        if (carts[row][col + 1]) {
            carts[row][col + 1] = undefined;
            carts[row][col] = undefined;
            cartCount = cartCount - 2;
            colide = true;
        }
    }

    return [cartCount, colide];
}


function checkForColision(carts, row, col, direction) {
    let colision;

    // down 
    if (direction === 1) {
        if (carts[row + 1][col]) colision = [col, row + 1];
    }
    // left
    else if (direction === 2) {
        if (carts[row][col - 1]) colision = [col - 1, row];
    }
    // up
    else if (direction === 3) {
        if (carts[row - 1][col]) colision = [col, row - 1];
    }
    // right
    else if (direction === 4) {
        if (carts[row][col + 1]) colision = [col + 1, row];
    }

    if (colision) {
        return colision;
    }
    else return undefined;
}


function prepareData(i) {
    i = i.split("\r\n");

    let map = new Array();
    let carts = new Array();
    let cartCount = 0;

    i.forEach(row => {
        map.push(row.split(""));
    });

    for (let row = 0; row < map.length; row++) {

        let rowCarts = new Array();

        for (let col = 0; col < map[0].length; col++) {

            const position = map[row][col];

            if (position === "^" || position === "<" || position === ">" || position === "v") {
                rowCarts[col] = {
                    moved: false,
                    intersect: 1,
                    direction: getDirection(position)
                };
                cartCount++;

                map[row][col] = getTrack(position);
            }
            else rowCarts[col] = undefined;
        }

        carts.push(rowCarts);
    }

    return [map, carts, cartCount];
}


function getTrack(position) {
    if (position === "^" && position === "v") {
        return "|"
    }
    else {
        return "-"
    }
}


function getDirection(position) {
    if (position === "v") return 1;
    else if (position === "<") return 2;
    else if (position === "^") return 3;
    else return 4;
}

function prepareforNewTick(carts) {
    carts.forEach(row => {
        row.forEach(cart => {
            if (cart) {
                cart.moved = false;
            }
        })
    });

    return carts;
}