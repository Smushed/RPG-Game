$(document).ready(function() {
    //Grabbing elements of the webpage
    var characterSelector = $("#character-selector");
    var playerChoice = "";
    var charPicked = "";
    var enemyPicked = "";
    var charIsPicked = false;
    var enemyIsPicked = false;
    var enemiesDefeated = 0;

    //Initialize all the characters
    let obiwan = {
        name: "Obi-Wan",
        hitPoints: 120,
        attackPower: 8,
        counterAttackPower: 8
    };
    let anakin = {
        name: "Anakin",
        hitPoints: 150,
        attackPower: 10,
        counterAttackPower: 4
    };
    let yoda = {
        name: "Yoda",
        hitPoints: 100,
        attackPower: 12,
        counterAttackPower: 30
    };
    let darthMaul = {
        name: "Darth Maul",
        hitPoints: 180,
        attackPower: 6,
        counterAttackPower: 15
    };

    function restartGame(){
        //Empties all the divs where the characters were located
        $("#character-selector").empty();
        $("#character").empty();
        $("#enemy").empty();
        $("#available-enemies").empty();
        $("#attack-results").empty();

        //Clears the variables that decided what character was picked
        charPicked = "";
        enemyPicked = ""
        charIsPicked = false;
        enemyIsPicked = false;
        enemiesDefeated = 0;

        resetStats();
    };

    function resetStats(){
        obiwan.hitPoints = 120;
        anakin.hitPoints = 150;
        yoda.hitPoints = 100;
        darthMaul.hitPoints = 180;

        obiwan.attackPower = 8;
        anakin.attackPower = 10;
        yoda.attackPower = 12;
        darthMaul.attackPower = 6;
    }

    function beginGame(){
        restartGame();

        // Adds all the characters to the selector
        characterSelector.append(`<div class="character-box" id="obiwan"><div>${obiwan.name}</div><img src="assets/images/obiwan.jpg" alt="Obi-Wan"><div id="obiwan-health">Health: ${obiwan.hitPoints}</div></div>`);
        characterSelector.append(`<div class="character-box" id="anakin"><div>${anakin.name}</div><img src="assets/images/anakin.jpg" alt="Anakin"><div id="anakin-health">Health: ${anakin.hitPoints}</div></div>`);
        characterSelector.append(`<div class="character-box" id="yoda"><div>${yoda.name}</div><img src="assets/images/yoda.jpg" alt="Yoda"><div id="yoda-health">Health: ${yoda.hitPoints}</div></div>`);
        characterSelector.append(`<div class="character-box" id="darthmaul"><div>${darthMaul.name}</div><img src="assets/images/darthmaul.jpeg" alt="DarthMaul"><div id="darthmaul-health">Health: ${darthMaul.hitPoints}</div></div>`);
    
        styleCharcterSelector();
    };

    function styleCharcterSelector(){
        $(".character-box").css({"border": "solid 3px green", "color": "black", "float": "left", "height": "203px", "padding": "0 15px", "margin-left": "15px", "text-align": "center", "font-weight": "700", "background": "white"});
    };

    function styleEnemies(){
        $(".enemy").css({"border": "3px solid darkgrey", "background": "red", "color": "black"});
    }

    function originalCharPicked(){
        //Finds out what character was picked, updates the page and adds a class
        charIsPicked = true;
        charPicked = playerChoice;
        if (playerChoice === "obiwan"){
            charPicked = obiwan;
            $("#obiwan").appendTo("#character").addClass("character");
            $("#anakin").appendTo("#available-enemies").addClass("enemy");
            $("#yoda").appendTo("#available-enemies").addClass("enemy");
            $("#darthmaul").appendTo("#available-enemies").addClass("enemy");
        } else if (playerChoice === "anakin") {
            charPicked = anakin;
            $("#obiwan").appendTo("#available-enemies").addClass("enemy");
            $("#anakin").appendTo("#character").addClass("character");
            $("#yoda").appendTo("#available-enemies").addClass("enemy");
            $("#darthmaul").appendTo("#available-enemies").addClass("enemy");
        } else if (playerChoice === "yoda") {
            charPicked = yoda;
            $("#obiwan").appendTo("#available-enemies").addClass("enemy");
            $("#anakin").appendTo("#available-enemies").addClass("enemy");
            $("#yoda").appendTo("#character").addClass("character");
            $("#darthmaul").appendTo("#available-enemies").addClass("enemy");
        } else if (playerChoice === "darthmaul") {
            charPicked = darthMaul;
            $("#obiwan").appendTo("#available-enemies").addClass("enemy");
            $("#anakin").appendTo("#available-enemies").addClass("enemy");
            $("#yoda").appendTo("#available-enemies").addClass("enemy");
            $("#darthmaul").appendTo("#character").addClass("character");
        };
        styleEnemies();
    };

    function moveEnemy(){
        if (playerChoice === "obiwan"){
            enemyPicked = obiwan;
            $("#obiwan").appendTo("#enemy");
        } else if (playerChoice === "anakin") {
            enemyPicked = anakin;
            $("#anakin").appendTo("#enemy");
        } else if (playerChoice === "yoda") {
            enemyPicked = yoda;
            $("#yoda").appendTo("#enemy");
        } else if (playerChoice === "darthmaul") {
            enemyPicked = darthMaul;
            $("#darthmaul").appendTo("#enemy");
        };
    };

    function pickEnemy(){
        //Checks to see if the most recent choice was their own character
        if (playerChoice === charPicked){
            return false;
        } else if (playerChoice !== charPicked){
            enemyIsPicked = true;
            moveEnemy();
        };
    };

    function gameLoss(){
        if (charPicked.hitPoints < 1){
            alert("You have been defeated. Please try again!");
            beginGame();
        };
    };

    function gameWin(){
        if (enemiesDefeated >= 3) {
            alert("Congratulations! You have defeated all the enemies and won the game!");
            $("#attack-results").html("Congratulations! You have defeated all the enemies and won the game!");
        };
    }

    function enemyDefeated(){
        if (enemiesDefeated < 3){
            enemiesDefeated++;
            $("#attack-results").append(`<p>You have defeated ${enemyPicked.name}! Choose your next enemy!`);
            $("#enemy").empty();
            enemyIsPicked = false;
        };
    }

    function updateWindowText(){
        $("#attack-results").html(`<p>You attacked ${enemyPicked.name} for ${charPicked.attackPower}</p><p>${enemyPicked.name} attacked you back for ${enemyPicked.counterAttackPower}`);
        //Updates all the health of all the characters
        $("#obiwan-health").html(`Health: ${obiwan.hitPoints}`);
        $("#anakin-health").html(`Health: ${anakin.hitPoints}`);
        $("#yoda-health").html(`Health: ${yoda.hitPoints}`);
        $("#darthmaul-health").html(`Health: ${darthMaul.hitPoints}`);
    }

    function attackEnemy(){
        enemyPicked.hitPoints -= charPicked.attackPower;

        //Increase attack power with each hit
        charPicked.attackPower += 4;
        if (enemyPicked.hitPoints < 1) {
            updateWindowText();
            enemyDefeated();
        } else {
            charPicked.hitPoints -= enemyPicked.counterAttackPower;
            updateWindowText();
        }
        // Checks to see if the player's health went to 0
        gameLoss();
        gameWin();
    };

    $("#attack").click(function(){
        if (charIsPicked && enemyIsPicked) {
            attackEnemy();
        } else {
            return false;
        }
    });

    $("body").on("click", ".character-box",function () {
        playerChoice = $(this).attr("id");
        if (!charIsPicked && !enemyIsPicked){
            originalCharPicked();
        } else if (charIsPicked && !enemyIsPicked){
            pickEnemy();
        };
    });

    beginGame();

    //Pull the character down from the selector into the fight box
    //Pull the enemy down from the selector into the fight box
    //Attack and increment the player's attack value
    //Counter attack
});