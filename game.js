/*
    TODO:
    FIX IT BEING SO GOD DAMN LAGGY AFTER MORE THAN 20 SECONDS (maybe by adding a timer to insta fail you after x seconds)
*/

// GLOBALS
const daColors = ['0xdd0000', '0x00dd00', '0x0000dd'];

var cubeSize;
var cubeX;
var cubeY;
var cubeColorIndex;
var cubeColor = getColor(cubeColorIndex);

var sphereRadius;
var sphereX;
var sphereY;
var sphereColorIndex;
var sphereColor = getColor(sphereColor);

var cylinderSizeX;
var cylinderSizeY;
var cylinderX;
var cylinderY;
var cylinderColorIndex;
var cylinderColor = getColor(cylinderColorIndex);

var cubePresent = false;
var spherePresent = false;
var cylinderPresent = false;

let hasCube = localStorage.getItem('hasCube');
let hasSphere = localStorage.getItem('hasSphere');
let hasCylinder = localStorage.getItem('hasCylinder');

var gamebgColor = localStorage.getItem('bgColor');

// Create a Phaser.js game instance
var config = {
    type: Phaser.WEBGL,
    parent: 'game',
    width: 1872,
    height: 936,
    backgroundColor: gamebgColor,
    scene: {
        create: create,
        update: render,
    }
};

var game = new Phaser.Game(config);
var graphics = null;
var updateInterval = 1000; // 1 fps
var lastUpdateTime = 0;
function create() {
    graphics = this.add.graphics();
}

function render(time) {
    var elapsed = time - lastUpdateTime;

    if (elapsed >= updateInterval) {
        lastUpdateTime = time;

        // clear screen to show new values
        graphics = this.add.graphics();
        graphics.fillStyle(localStorage.getItem('bgColor'));
        graphics.fillRect(0, 0, 1872, 936);

        // add cube
        if (cubePresent) {
            graphics = this.add.graphics();
            cubeX = parseInt(document.getElementById('cubeXPos').value);
            cubeY = parseInt(document.getElementById('cubeYPos').value);
            cubeSize = parseInt(document.getElementById('cubeSize').value);
            cubeColor = getColor(document.getElementById('cubeColor').value);

            // outline
            graphics.fillStyle(outlineColor);
            graphics.fillRect(cubeX, cubeY, cubeSize, cubeSize);
            // fill
            graphics.fillStyle(cubeColor);
            graphics.fillRect(cubeX+5, cubeY+5, cubeSize-10, cubeSize-10);
            // dot
            graphics.fillStyle(outlineColor);
            graphics.fillRect(cubeX + cubeSize / 2 - 5, cubeY + cubeSize / 2 - 5, 10, 10);

        }

        // add sphere
        if (spherePresent) {
            graphics = this.add.graphics();
            sphereX = parseInt(document.getElementById('sphereXPos').value);
            sphereY = parseInt(document.getElementById('sphereYPos').value);
            sphereRadius = parseInt(document.getElementById('sphereRadius').value);
            sphereColor = getColor(document.getElementById('sphereColor').value)

            // outline
            graphics.fillStyle(outlineColor);
            graphics.fillCircle(sphereX, sphereY, sphereRadius, 0, Math.PI);
            // fill
            graphics.fillStyle(sphereColor);
            graphics.fillCircle(sphereX, sphereY, sphereRadius-5, 0, Math.PI);
            // dot
            graphics.fillStyle(outlineColor);
            graphics.fillCircle(sphereX, sphereY, 5, 0, Math.PI);
        }

        // add cylinder
        if (cylinderPresent) {
            graphics = this.add.graphics();
            cylinderX = parseInt(document.getElementById('cylinderXPos').value);
            cylinderY = parseInt(document.getElementById('cylinderYPos').value);
            cylinderSizeX = parseInt(document.getElementById('cylinderSizeX').value);
            cylinderSizeY = parseInt(document.getElementById('cylinderSizeY').value);
            cylinderColor = getColor(document.getElementById('cylinderColor').value);

            // outline
            graphics.fillStyle(outlineColor);
            graphics.fillRect(cylinderX, cylinderY, cylinderSizeX, cylinderSizeY);
            // fill
            graphics.fillStyle(cylinderColor);
            graphics.fillRect(cylinderX+5, cylinderY+5, cylinderSizeX-10, cylinderSizeY-10);
            // dot
            graphics.fillStyle(outlineColor);
            graphics.fillRect(cylinderX + cylinderSizeX / 2 - 5, cylinderY + cylinderSizeY / 2 - 5, 10, 10);

        }

        // set the gameboard to be the phaser canvas
        // get the phaser-canvas
        let canvas = document.querySelector('canvas');
        let gameBoard = document.getElementsByClassName('gameboard')[0];
        // only update when it will change something
        if (gameBoard.style.backgroundImage != `url(${canvas.toDataURL()})`) {
            gameBoard.style.backgroundImage = `url(${canvas.toDataURL()})`;
        }
    }
}

function createCube(event) {
    if (hasCube == 'false') { return; }
    updateInterval = 50; // 20 fps
    if (hasCube) {
        if (!cubePresent) {
            event.target.style.opacity = '.5';
            cubePresent = true;
        }
        else {
            event.target.style.opacity = '1';
            cubePresent = false;
        }
    }
}

function createSphere(event) {
    if (hasSphere == 'false') { return; }
    updateInterval = 50; // 20 fps
    if (hasSphere) {
        if (!spherePresent) {
            event.target.style.opacity = '.5';
            spherePresent = true;
        }
        else {
            event.target.style.opacity = '1';
            spherePresent = false;
        }
    }
}

function createCylinder(event) {
    if (hasCylinder == 'false') { return; }
    updateInterval = 50; // 20 fps
    if (hasCylinder) {
        if (!cylinderPresent) {
            event.target.style.opacity = '.5';
            cylinderPresent = true;
        }
        else {
            event.target.style.opacity = '1';
            cylinderPresent = false;
        }
    }
}

function getColor(index) {
    return daColors[index];
}

function test(str) {
    console.log("test function, value passed:", str);
    if (str == 'true') {
        return true;
    }
    return false;
}

function check() {
    /*
        score starts at (200 * shapes present), then decreases by every px something is off (0.5 points for position: )
        the score is then flattened to 100 and given to the player in money
        if the player didn't use all shapes present / used to many shapes, they loose all points
        if any of the colors are wrong, they loose all points
    */

    let points = 0;
    let shapesPresent = 0;

    console.log("Points before all shapes:", points);

    if (cubePresent) {
        points += 100;
        shapesPresent++;

        console.log("Points before cube:", points);

        points -= Math.abs(cubeSize - parseInt(sessionStorage.getItem('cubeSize')));
        points -= 0.5 * Math.abs(cubeX - parseInt(sessionStorage.getItem('cubeX')));
        points -= 0.5 * Math.abs(cubeY - parseInt(sessionStorage.getItem('cubeY')));

        console.log(Math.abs(cubeSize - parseInt(sessionStorage.getItem('cubeSize'))));
        console.log(0.5 * Math.abs(cubeX - parseInt(sessionStorage.getItem('cubeX'))));
        console.log(0.5 * Math.abs(cubeY - parseInt(sessionStorage.getItem('cubeY'))));

        console.log("Points after cube:", points);

        // check for insta fail based on colors
        if (cubeColor != sessionStorage.getItem('cubeColor')) {
            points = 0;
            console.log("Wrong Color:", cubeColor != sessionStorage.getItem('cubeColor'));
        }
    }
    
    if (spherePresent) {
        points += 100;
        shapesPresent++;

        console.log("Points before sphere:", points);

        points -= Math.abs(sphereRadius - parseInt(sessionStorage.getItem('sphereRadius')));
        points -= 0.5 * Math.abs(sphereX - parseInt(sessionStorage.getItem('sphereX')));
        points -= 0.5 * Math.abs(sphereY - parseInt(sessionStorage.getItem('sphereY')));

        console.log(Math.abs(sphereRadius - parseInt(sessionStorage.getItem('sphereRadius'))));
        console.log(0.5 * Math.abs(sphereX - parseInt(sessionStorage.getItem('sphereX'))));
        console.log(0.5 * Math.abs(sphereY - parseInt(sessionStorage.getItem('sphereY'))));

        console.log("Points after sphere:", points);

        // check for insta fail based on colors
        if (sphereColor != sessionStorage.getItem('sphereColor')) {
            points = 0;
            console.log("Wrong Color:", sphereColor != sessionStorage.getItem('sphereColor'));
        }
    }

    
    
    if (cylinderPresent) {
        points += 100;
        shapesPresent++;

        console.log("Points before cylinder:", points);
        
        points -= 0.5 * Math.abs(cylinderSizeX - parseInt(sessionStorage.getItem('cylinderSizeX')) + 
        parseInt(sessionStorage.getItem('cylinderSizeY')));
        // cylinder has 4 factors, others have 3. so we avrage the difference of the size
        points -= 0.5 * Math.abs(cylinderX - parseInt(sessionStorage.getItem('cylinderX')));
        points -= 0.5 * Math.abs(cylinderY - parseInt(sessionStorage.getItem('cylinderY')));

        console.log(0.5 * (Math.abs(cylinderSizeX - parseInt(sessionStorage.getItem('cylinderSizeX')) + 
        parseInt(sessionStorage.getItem('cylinderSizeY')))));
        console.log(0.5 * Math.abs(cylinderX - parseInt(sessionStorage.getItem('cylinderX'))));
        console.log(0.5 * Math.abs(cylinderY - parseInt(sessionStorage.getItem('cylinderY'))));

        console.log("Points after cylinder:", points);

        // check for insta fail based on colors
        if (cylinderColor != sessionStorage.getItem('cylinderColor')) {
            points = 0;
            console.log("Wrong Color:", cylinderColor != sessionStorage.getItem('cylinderColor'));
        }
    }

    console.log("Points after all shapes:", points);

    let inGuideCube = sessionStorage.getItem('inGuideCube');
    let inGuideSphere = sessionStorage.getItem('inGuideSphere');
    let inGuideCylinder = sessionStorage.getItem('inGuideCylinder');

    // check for insta fails based on shape attendance
    if (test(inGuideCube) != cubePresent ||
        test(inGuideSphere) != spherePresent ||
        test(inGuideCylinder) != cylinderPresent
        ) {
        points = 0;
        console.log("Attendance Fails: Cube, Sphere, Cylinder |", test(inGuideCube) != cubePresent, test(inGuideSphere) != spherePresent, test(inGuideCylinder) != cylinderPresent);
            // debug
            console.log("test(inGuideCube):", test(inGuideCube), "cubePresent:", cubePresent, "\ntest(inGuideSphere):", test(inGuideSphere), "spherePresent:", spherePresent, "\ntest(inGuideCylinder):", test(inGuideCylinder), "cylinderPresent:", cylinderPresent);
    }

    console.log("Points after shape attendance:", points);
    
    points = parseInt(points/shapesPresent);

    if (!points) {
        points = 0;
    }
    

    console.log("Points after flattening:", points);

    // change stats

    // get old stats
    let average = Math.round(parseFloat(localStorage.getItem('AveragePoints')), 1);
    let wins = parseInt(localStorage.getItem('Wins'))
    let losses = parseInt(localStorage.getItem('Losses'))
    
    // get old total
    average = average * (parseInt(localStorage.getItem('Wins')) + parseInt(localStorage.getItem('Losses')));

    // wins & losses
    if (points > 0) {
        localStorage.setItem('Wins', ++wins);
    }
    else {
        localStorage.setItem('Losses', ++losses);
    }

    // get new average and push it
    average = (average + points) / (wins + losses);
    localStorage.setItem('AveragePoints', average);

    // update money
    localStorage.setItem('money', parseInt(localStorage.getItem('money'))+points);

    // tell the player
    alert(`You got $${points}!`);

    // reload window
    location.reload();
}