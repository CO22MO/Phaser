const menuDiv = $('.menu');

const menuContent = $('#menu_content');
const guide = $('.guide');
const navBar = $('.nav_bar');

const tabShop = $('#shop'); 
const tabLevels = $('#levels');
const tabStats = $('#stats');
const tabOptions = $('#options');

const menuShop = $('.shop');
const menuLevels = $('.levels');
const menuStats = $('.stats');
const menuOptions = $('.options');

const sphereBlue = $('#sphereBlue');
const cubeBlue = $('#cubeBlue');
const cylinderBlue = $('#cylinderBlue');

const items = $('#items');

var mouseDown = false;
// checking if the mouse is down and putting it in a variable bc javascript dumdum
$(window).on("mousedown", function() {
    mouseDown = true;
});
$(window).on("mouseup", function() {
    mouseDown = false;
});

//Shop variable
const moneyElement = $('.cash');

// reset session storage
sessionStorage.clear()

// check what shapes the user has
if (!localStorage.getItem('hasCube')) { localStorage.setItem('hasCube', 'false') }
if (!localStorage.getItem('hasSphere')) { localStorage.setItem('hasSphere', 'false') }
if (!localStorage.getItem('hasCylinder')) { localStorage.setItem('hasCylinder', 'false') }
if (!localStorage.getItem('bgColor')) { localStorage.setItem('bgColor', '0x1a1a1a') }
if (!localStorage.getItem('Wins')) { localStorage.setItem('Wins', '0') }
if (!localStorage.getItem('Losses')) { localStorage.setItem('Losses', '0') }
if (!localStorage.getItem('AveragePoints')) { localStorage.setItem('AveragePoints', '0') }

// init money for first time palyers
if (!localStorage.getItem('money')) {
    localStorage.setItem('money', 1000);

    closeTabs();
    
    // start the "tutorial"
    setTimeout(function() {
        alert("Open the shop and buy your first shape!");
    }, 500);
    
    // start first time "click me" animation on shop to buy your first item
    setTimeout(function() {
        tabShop.attr('id', 'shop_null');
    }, 1000);

    //Shange the shop back when clicked
    $(tabShop).on('click', function () {
        tabShop.attr('id', 'shop');

        sphereBlue.attr('id', 'sphereBlue_null')
    })

    $(sphereBlue).on('click', function () {
        sphereBlue.attr('id', 'sphereBlue');

        tabLevels.attr('id', 'levels_null');
    })

    $(tabLevels).on('click', function () {
        tabLevels.attr('id', 'levels');

        location.reload();
    })
}
moneyElement[0].innerHTML = localStorage.getItem('money');

// push bg color to local storage
$(window).on("mousedown", function() {
    if (menuOptions.css('display') == 'flex') {
        var bgcolor = document.getElementById('colorPicker').value;
        bgcolor = `0x${bgcolor.slice(-6)}`;
        localStorage.setItem('bgColor', bgcolor)
    }
})

$('#colorPicker')[0].value = `#${localStorage.getItem('bgColor').slice(2)}`;

// open and close the menu
$(window).on("mousemove", openMenu);
$(window).on("mousedown", openMenu);

// scroll inside the menu
$(menuContent).on("wheel", function (event) {
    const delta = parseInt(event.originalEvent.deltaY);
    let max = parseInt(menuContent.css('height')) - parseInt(menuDiv.css('height'));
    max -= max*2;
    top_pos = parseInt(menuContent.css('top'));
    top_pos -= delta / 2;
    if (top_pos >= max) {
        if (top_pos > 0) {
            top_pos = 0;
        }
        menuContent.css('top', top_pos + 'px');
    }
})



// toggle the guide by clicking on it
$(guide).on('click', function () {
    toggleGuide();
})

// open and close tabs
$(tabShop).on('click', function () {
    if (menuShop.css('display') == 'none') {
        closeTabs()
        // update values
        rememberBuyStates();
        moneyElement[0].innerHTML = localStorage.getItem('money');
        menuShop.css('display', 'flex');
    }
    else {
        menuShop.css('display', 'none');
        if (localStorage.getItem('hasCube') == 'true' || localStorage.getItem('hasCylinder') == 'true') {
            location.reload();
        }
    }
})
$(tabLevels).on('click', function () {
    if (menuLevels.css('display') == 'none') {
        closeTabs()
        menuLevels.css('display', 'flex');
    }
    else {
        menuLevels.css('display', 'none');
    }
})
$(tabStats).on('click', function () {
    if (menuStats.css('display') == 'none') {
        closeTabs()
        // update values
        updateStats()
        menuStats.css('display', 'flex');
    }
    else {
        menuStats.css('display', 'none');
    }
})
$(tabOptions).on('click', function () {
    if (menuOptions.css('display') == 'none') {
        closeTabs()
        menuOptions.css('display', 'flex');
    }
    else {
        menuOptions.css('display', 'none');
    }
})


/*
* 
* REEEEEEEEEE
* FUNCTIONS
* 
*/

function showMenu() {
    menuDiv.attr("id", "menu_active");
    if (guide.attr('id') == "guide_idle") {
        guide.css('left', '70%');
        guide.css('rotate', '1.5deg');
    }
}

function hideMenu() {
    menuDiv.attr("id", "menu_idle");
    if (guide.attr('id') == "guide_idle") {
        guide.css('left', '80%');
        guide.css('rotate', '-1.5deg');
    }
}

function updateStats() {
    document.getElementById('Wins').innerText = localStorage.getItem('Wins');
    document.getElementById('Losses').innerText = localStorage.getItem('Losses');
    document.getElementById('Average').innerText = `$${localStorage.getItem('AveragePoints')}`;
}

function toggleGuide() {
    if (guide.attr('id') == 'guide_idle' || guide.attr('id') == 'guide_null') {
        localStorage.setItem('firstTime', false);
        guide.attr('id', 'guide_active');
        // rotate randomly
        const rotation = parseFloat((Math.random() * 8) - 4);
        guide.css('rotate', rotation+'deg');
        guide.css('left', '50%');
        guide.css('top', '50%');
    }
    else {
        // rotate back to normal
        guide.attr('id', 'guide_idle');
        guide.css('rotate', '-1.5deg');
        guide.css('left', '80%');
        guide.css('top', '80%');
    }
}

function closeGuide() {
    if (guide.attr('id') == 'guide_active') {
        // rotate back to normal
        guide.attr('id', 'guide_idle');
        guide.css('rotate', '-1.5deg');
        guide.css('left', '80%');
        guide.css('top', '80%');
    }
}

function openGuide() {
    if (guide.attr('id') == 'guide_idle') {
        guide.attr('id', 'guide_active');
        // rotate randomly
        const rotation = parseFloat((Math.random() * 10) - 5);
        guide.css('rotate', rotation+'deg');
        // move
        guide.css('left', '50%');
        guide.css('top', '50%');
    }
}

function closeTabs() {
    menuShop.css('display', 'none');
    menuLevels.css('display', 'none');
    menuStats.css('display', 'none');
    menuOptions.css('display', 'none');
}

//Shop function
function purchase(event) {
    const item = event.target;
    const itemCost = parseInt(item.dataset.cost);
    let money = parseInt(moneyElement[0].innerHTML);

    if (money >= itemCost) {
        // give the player the item
        if (item.id.includes('cube')) { localStorage.setItem('hasCube', 'true') }
        else if (item.id.includes('sphere')) { localStorage.setItem('hasSphere', 'true') }
        else { localStorage.setItem('hasCylinder', 'true') }
        // do money shit
        money = money - itemCost;
        localStorage.setItem('money', money);
        moneyElement[0].innerHTML = money;
        item.classList.add("overlay");
        item.classList.remove("items");
        item.onclick = null;
        location.reload();
    }
    else {
        document.getElementsByClassName("cash_sign")[0].style.animation = "flash .75s linear";
        document.getElementsByClassName("cash")[0].style.animation = "flash .75s linear";
        setTimeout(function() {
            document.getElementsByClassName("cash_sign")[0].style.animation = "";
            document.getElementsByClassName("cash")[0].style.animation = "";
        }, 750);
    }
}

function rememberBuyStates() {
    // block the user from buying the same shape twice
    if (localStorage.getItem('hasSphere') == 'true') {
        sphereBlue[0].classList.add("overlay");
        sphereBlue[0].classList.remove("items");
        sphereBlue[0].onclick = null;
    }
    if (localStorage.getItem('hasCube') == 'true') {
        cubeBlue[0].classList.add("overlay");
        cubeBlue[0].classList.remove("items");
        cubeBlue[0].onclick = null;
    }
    if (localStorage.getItem('hasCylinder') == 'true') {
        cylinderBlue[0].classList.add("overlay");
        cylinderBlue[0].classList.remove("items");
        cylinderBlue[0].onclick = null;
    }
}

//Options functions
function colorReset() {
    localStorage.setItem("bgColor", "0x1a1a1a");
    closeTabs();
    $('#colorPicker')[0].value = `#${localStorage.getItem('bgColor').slice(2)}`;
}

function openMenu(event) {
    const mouseX = event.clientX;

    // menu
    const offset = menuDiv.offset();
    const menuLeft = offset.left;

    // only check to close if the mouse is not held down
    // this way it won't close if you overshoot a slider in the menu
    // it also won't open if your trying to select stuff on the screen (for whatever reason)
    if (!mouseDown) {
        // add 75px of buffer
        if (mouseX >= menuLeft - 75) {
            showMenu();
        } 
        else {
            hideMenu();
        }
    }
}

function cheat() {
    localStorage.setItem('money', parseInt(localStorage.getItem('money'))+10000);
    alert(`You just cheated in $10000.\n\nDo you feel good about yourself?`);
    location.reload();
}


function gameReset() {
    localStorage.clear();
    location.reload();
}