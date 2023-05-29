<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHASER GAME</title>
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./menu.css"> <!-- everything inside of the menu -->
    <script src="./jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/phaser/dist/phaser.min.js"></script>
</head>

<body>
    <div class="nav_bar">
        <div class="navbar_item" id="shop"> <!-- shop_null-->
        </div>
        <div class="navbar_item" id="levels"> <!-- levels_null-->
        </div>
        <div class="navbar_item" id="stats"> <!-- stats_null-->
        </div>
        <div class="navbar_item" id="options">
        </div>
    </div>
    <div class="gameboard">
        <div class="menu" id="menu_idle"> <!-- menu_idle || menu_active -->
            <div id="menu_navbar">
                <div class="menu_navbar_item" id="navbar_cube" onclick="createCube(event)">
                </div>
                <div class="menu_navbar_item" id="navbar_sphere" onclick="createSphere(event)">
                </div>
                <div class="menu_navbar_item" id="navbar_cylinder" onclick="createCylinder(event)">
                </div>
            </div>
            <div id="menu_content">
                <div class="shape_controls" id="content_sphere">
                    <span>Sphere Controls</span>
                    <p>Sphere Radius</p>
                    <input type="range" id="sphereRadius" min="50" max="250" value="50" class="slider">
                    <p>Sphere X Pos</p>
                    <input type="range" id="sphereXPos" min="100" max="1822" value="100" class="slider">
                    <p>Sphere Y Pos</p>
                    <input type="range" id="sphereYPos" min="100" max="886" value="100" class="slider">
                    <p>Sphere Color</p>
                    <input type="range" id="sphereColor" min="0" max="2" value="0" class="slider">
                </div>
                <div class="shape_controls" id="content_cube">
                    <span>Cube Controls</span>
                    <p>Cube Size</p>
                    <input type="range" id="cubeSize" min="50" max="500" value="50" class="slider">
                    <p>Cube X Pos</p>
                    <input type="range" id="cubeXPos" min="50" max="1822" value="50" class="slider">
                    <p>Cube Y Pos</p>
                    <input type="range" id="cubeYPos" min="50" max="886" value="50" class="slider">
                    <p>Cube Color</p>
                    <input type="range" id="cubeColor" min="0" max="2" value="0" class="slider">
                </div>
                <div class="shape_controls" id="content_cylinder">
                    <span>Cylinder Controls</span>
                    <p>Cylinder Size X</p>
                    <input type="range" id="cylinderSizeX" min="50" max="500" value="50" class="slider">
                    <p>Cylinder Size Y</p>
                    <input type="range" id="cylinderSizeY" min="50" max="500" value="50" class="slider">
                    <p>Cylinder X Pos</p>
                    <input type="range" id="cylinderXPos" min="50" max="1822" value="50" class="slider">
                    <p>Cylinder Y Pos</p>
                    <input type="range" id="cylinderYPos" min="50" max="886" value="50" class="slider">
                    <p>Cylinder Color</p>
                    <input type="range" id="cylinderColor" min="0" max="2" value="0" class="slider">
                </div>
            </div>

            <div class="menu_buttons">
                <div class="menu_button" id="cheat_button" onclick="cheat()">GIVE MONEY</div>
                <div class="menu_button" id="complete_button" onclick="check()">CHECK FRAME</div>
            </div>
        </div>
        <div class="guide" id="guide_idle"> <!-- guide_idle || guide_active -->
        </div>
        <div class="tabs">
            <div class="shop">
                <span class="tab_title">SHOP</span>

                <div class="cash_container">
                    <p class="cash_sign">$</p>
                    <p class="cash"> loading...</p>
                </div>

                <div id="shop_holder">

                    <div onclick="purchase(event)" class="items" id="sphereBlue" data-cost="1000">$1000</div> <!-- spereBlue_null-->
                    <div onclick="purchase(event)" class="items" id="cubeBlue" data-cost="2500">$2500</div>
                    <div onclick="purchase(event)" class="items" id="cylinderBlue" data-cost="10000">$10000</div>
                    <!--
                    <div onclick="purchase(event)" class="items" id="sphereRed" data-cost="500">$500</div>
                    <div onclick="purchase(event)" class="items" id="cubeRed" data-cost="500">$500</div>
                    <div onclick="purchase(event)" class="items" id="cylinderRed" data-cost="500">$500</div>

                    <div onclick="purchase(event)" class="items" id="sphereGreen" data-cost="100">$100</div>
                    <div onclick="purchase(event)" class="items" id="cubeGreen" data-cost="100">$100</div>
                    <div onclick="purchase(event)" class="items" id="cylinderGreen" data-cost="100">$100</div>
                    -->
                </div>

            </div>
            <div class="levels">
                <span class="tab_title">LEVELS</span>

                <div id="levels_holder">
                    <div class="difficulty" id="levelOne" onclick="startGame(event);closeTabs();">1</div> <!-- levelOne_null-->

                    <div class="difficulty" id="levelTwo" onclick="startGame(event);closeTabs();">2</div>

                    <div class="difficulty" id="levelThree" onclick="startGame(event);closeTabs();">3</div>
                </div>

            </div>
            <div class="stats">
                <span class="tab_title">STATS</span>

                <div class="statistics_holder">
                    <div class="WinLose" id="wins">
                        <p>Wins:</p>
                        <b id="Wins" style="color: #306043;">0</b>
                    </div>

                    <div class="WinLose" id="losses">
                        <p>Losses:</p>
                        <b id="Losses" style="color: #9c3632;">0</b>
                    </div>

                    <div class="WinLose" id="average">
                        <p>Average:</p>
                        <b id="Average" style="color: #ffff70;">0</b>
                    </div>
                </div>



            </div>
            <div class="options">
                <span class="tab_title">OPTIONS</span>

                <div class="options_holder">
                    <div class="option" id="color">
                        <p>Background Color</p>

                        <input class="optionsInput" type="color" id="colorPicker">

                        <p style="padding-left: 50px;">Reset</p>

                        <input class="optionsInput" type="button" onclick="colorReset()">
                    </div>

                    <div class="option" id="restart">
                        <p>Reset Game Progress</p>

                        <input class="optionsInput" type="button" id="gameReset" onclick="gameReset()">

                    </div>
                </div>
            </div>
        </div>
        <div id="game"></div>
        <div id="gameGuide"></div>
    </div>

    
</body>
<script src="./script.js"></script>
<script src="./game.js"></script>
<script src="./renderGuide.js"></script>
</html>