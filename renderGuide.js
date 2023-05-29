let guide_hasCube = localStorage.getItem('hasCube');
let guide_hasSphere = localStorage.getItem('hasSphere');
let guide_hasCylinder = localStorage.getItem('hasCylinder');
let bgColor = '0x1a1a1a';;
let outlineColor = '0xffffff'
const colors = ['0xdd0000', '0x00dd00', '0x0000dd'];

var cubeX = 0;
var cubeY = 0;
var cubeSize = 0;
var cubeColor = 0;

var sphereX = 0;
var sphereY = 0;
var sphereRadius = 0;

var cylinderX = 0;
var cylinderY = 0;
var cylinderSizeX = 0;
var cylinderSizeY = 0;

var shapesToMake = [];
var timesRan = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * 3)];
}

function testIntersectionRectRect(rect1, rect2) {
    const x1 = rect1[0];
    const y1 = rect1[1];
    const dx1 = rect1[2];
    const dy1 = rect1[3];
    const x2 = rect2[0];
    const y2 = rect2[1];
    const dx2 = rect2[2];
    const dy2 = rect2[3];

    // Calculate the coordinates of the edges of the rectangles
    const left1 = x1;
    const right1 = x1 + dx1;
    const top1 = y1;
    const bottom1 = y1 + dy1;

    const left2 = x2;
    const right2 = x2 + dx2;
    const top2 = y2;
    const bottom2 = y2 + dy2;

    // Check for intersection
    if (left1 < right2 &&
        right1 > left2 &&
        top1 < bottom2 &&
        bottom1 > top2) {
        return true;
    }
    return false;
}

function testIntersectionRectCircle(rect, circle) {
    // Get the coordinates and sizes of the rectangle
    const [rectX, rectY, rectWidth, rectHeight] = rect;

    // Get the coordinates and radius of the circle
    const [circleX, circleY, circleRadius] = circle;

    // Calculate the center coordinates of the rectangle
    const rectCenterX = rectX + rectWidth / 2;
    const rectCenterY = rectY + rectHeight / 2;

    // Calculate the distance between the center of the circle and the center of the rectangle
    const dx = Math.abs(circleX - rectCenterX);
    const dy = Math.abs(circleY - rectCenterY);

    const cornerDistanceSquared = (dx - rectWidth / 2) ** 2 + (dy - rectHeight / 2) ** 2;

    // Check for intersection
    if (dx > rectWidth / 2 + circleRadius || dy > rectHeight / 2 + circleRadius) {
        return false; // Circle and rectangle are too far apart to intersect
    }
    else if (dx <= rectWidth / 2 || dy <= rectHeight / 2) {
        return true; // Circle intersects the rectangle
    }
    // Check for intersection with the corners of the rectangle
    else if (cornerDistanceSquared <= circleRadius ** 2) {
        return true;
    }
    else {
        return false;
    }
}

// Create a Phaser.js game instance
var g_config = {
    type: Phaser.WEBGL,
    parent: 'gameGuide',
    width: 1872,
    height: 936,
    backgroundColor: bgColor,
    scene: {
        create: createGuide
    }
};

function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function startGame(event) {
    if (!gameGuide.id) {
        alert("You have to finish your current game first!");
    }

    const level = event.target.id;
    let temp;
    let ownedShapes = [];

    shapesToMake = []

    if (guide_hasSphere == 'true') {
        ownedShapes.push('sphere'); // sphere
    }
    if (guide_hasCylinder == 'true') {
        ownedShapes.push('cylinder'); // cylinder
    }
    if (guide_hasCube == 'true') {
        ownedShapes.push('cube'); // cube
    }

    switch (level) {
        case 'levelOne':
            if (ownedShapes.length < 1) {
                // yell at player
                alert("You don't have anough shapes for this level!");
                break;
            }
            // pick 1 random shape
            temp = getRandomInt(0, ownedShapes.length - 1); // pick one
            shapesToMake.push(ownedShapes[temp]); // add it to the shapes to make
            removeItem(ownedShapes, ownedShapes[temp]); // remove the shape so it's not pushed again
            break;

        case 'levelTwo':
            if (ownedShapes.length < 2) {
                // yell at player
                alert("You don't have anough shapes for this level!");
                break;
            }
            // pick 2 random shapes
            for (i = 0; i < 2; i++) {
                temp = getRandomInt(0, ownedShapes.length - 1); // pick one
                shapesToMake.push(ownedShapes[temp]); // add it to the shapes to make
                removeItem(ownedShapes, ownedShapes[temp]); // remove the shape so it's not pushed again
            }
            break;

        case 'levelThree':
            if (ownedShapes.length < 3) {
                // yell at player
                alert("You don't have anough shapes for this level!");
                break;
            }
            // pick 3 random shapes
            for (i = 0; i < 3; i++) {
                temp = getRandomInt(0, ownedShapes.length - 1); // pick one
                shapesToMake.push(ownedShapes[temp]); // add it to the shapes to make
                removeItem(ownedShapes, ownedShapes[temp]); // remove the shape so it's not pushed again
            }

            break;

        default:
            break;
    }
    gameGuide = new Phaser.Game(g_config);
}

function createGuide() {

    graphics.fillStyle(bgColor);
    graphics.fillRect(0, 0, 1872, 936);

    if (shapesToMake.includes('cube')) {

        const graphics = this.add.graphics();

        cubeSize = getRandomInt(50, 500);
        cubeX = getRandomInt(50, 1872 - (cubeSize + 50));
        cubeY = getRandomInt(50, 936 - (cubeSize + 50));

        cubeColor = getRandomColor();
        // outline
        graphics.fillStyle(outlineColor);
        graphics.fillRect(cubeX, cubeY, cubeSize, cubeSize);
        // fill
        graphics.fillStyle(cubeColor);
        graphics.fillRect(cubeX + 5, cubeY + 5, cubeSize - 10, cubeSize - 10);
        // dot
        graphics.fillStyle(outlineColor);
        graphics.fillRect(cubeX + cubeSize / 2 - 5, cubeY + cubeSize / 2 - 5, 10, 10);

        // globalize variables
        sessionStorage.setItem('cubeX', cubeX);
        sessionStorage.setItem('cubeY', cubeY);
        sessionStorage.setItem('cubeSize', cubeSize);
        sessionStorage.setItem('cubeColor', cubeColor);
        sessionStorage.setItem('inGuideCube', true);
    }

    if (shapesToMake.includes('sphere')) {

        const graphics = this.add.graphics();

        // since this takes the center point, and not the top left, we need to shift min and max by the radius
        sphereRadius = getRandomInt(50, 250);
        sphereX = getRandomInt(50 + sphereRadius, 1872 - (sphereRadius + 50));
        sphereY = getRandomInt(50 + sphereRadius, 936 - (sphereRadius + 50));

        // make the shapes not block each other
        let sphereTries = 0
        while (testIntersectionRectCircle([cubeX, cubeY, cubeSize, cubeSize], [sphereX, sphereY, sphereRadius])) {
            if (sphereTries++ == 1000) {
                break; // it's impossible to make a sphere
            }
            // there is no need to re-do the radius
            sphereX = getRandomInt(50 + sphereRadius, 1872 - (sphereRadius + 50));
            sphereY = getRandomInt(50 + sphereRadius, 936 - (sphereRadius + 50));
        }

        if (sphereTries < 1000) {
            var sphereColor = getRandomColor();

            // outline
            graphics.fillStyle(outlineColor);
            graphics.fillCircle(sphereX, sphereY, sphereRadius, 0, Math.PI);
            // fill
            graphics.fillStyle(sphereColor);
            graphics.fillCircle(sphereX, sphereY, sphereRadius - 5, 0, Math.PI);
            // dot
            graphics.fillStyle(outlineColor);
            graphics.fillCircle(sphereX, sphereY, 5, 0, Math.PI);

            // globalize variables
            sessionStorage.setItem('sphereX', sphereX);
            sessionStorage.setItem('sphereY', sphereY);
            sessionStorage.setItem('sphereRadius', sphereRadius);
            sessionStorage.setItem('sphereColor', sphereColor);
            sessionStorage.setItem('inGuideSphere', true);
        }
    }

    if (shapesToMake.includes('cylinder')) {

        const graphics = this.add.graphics();

        cylinderSizeX = getRandomInt(50, 500);
        cylinderSizeY = getRandomInt(50, 500);
        cylinderX = getRandomInt(50, 1872 - (cylinderSizeX + 50));
        cylinderY = getRandomInt(50, 936 - (cylinderSizeY + 50));

        // make the shapes not block each other
        let cylinderTries = 0;
        while ( // make sure it doesn't look to similar to a cube
            Math.abs(cylinderSizeX - cylinderSizeY) < 100 ||
            // dont block sphere
            testIntersectionRectCircle([cylinderX, cylinderY, cylinderSizeX, cylinderSizeY], [sphereX, sphereY, sphereRadius]) ||
            // dont block cube
            testIntersectionRectRect([cylinderX, cylinderY, cylinderSizeX, cylinderSizeY], [cubeX, cubeY, cubeSize, cubeSize])
        ) {
            if (cylinderTries++ == 1000) {
                break; // it's impossible to make a cylinder
            }
            // we don't need to remake the Y size
            cylinderSizeX = getRandomInt(50, 500);
            cylinderX = getRandomInt(50, 1872 - (cylinderSizeX + 50));
            cylinderY = getRandomInt(50, 936 - (cylinderSizeY + 50));
        }

        if (cylinderTries < 1000) {
            cylinderColor = getRandomColor();

            // outline
            graphics.fillStyle(outlineColor);
            graphics.fillRect(cylinderX, cylinderY, cylinderSizeX, cylinderSizeY);
            // fill
            graphics.fillStyle(cylinderColor);
            graphics.fillRect(cylinderX + 5, cylinderY + 5, cylinderSizeX - 10, cylinderSizeY - 10);
            // dot
            graphics.fillStyle(outlineColor);
            graphics.fillRect(cylinderX + cylinderSizeX / 2 - 5, cylinderY + cylinderSizeY / 2 - 5, 10, 10);

            // globalize variables
            sessionStorage.setItem('cylinderX', cylinderX);
            sessionStorage.setItem('cylinderY', cylinderY);
            sessionStorage.setItem('cylinderSizeX', cylinderSizeX);
            sessionStorage.setItem('cylinderSizeY', cylinderSizeY);
            sessionStorage.setItem('cylinderColor', cylinderColor);
            sessionStorage.setItem('inGuideCylinder', true);
        }
    }

    // render guide after it's had some time to make itself
    setTimeout(function() {
        renderGuide();
    }, 500)
}

function renderGuide() {
    let canvas = document.querySelectorAll('canvas')[1];
    let guide = document.getElementsByClassName('guide')[0];
    guide.style.display = "flex";
    guide.style.backgroundImage = `url(${canvas.toDataURL()})`;
}