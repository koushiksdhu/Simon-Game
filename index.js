let btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;



function nextSequence(){
    userClickedPattern = [];
    level++;
    let randomNumber = Math.floor(Math.random() * 4); 
    randomChoosenColor = btnColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#level-title").text("Level: "+level);
    sound(randomChoosenColor);
    animatePress(randomChoosenColor);
    checkAnswer(level);
}

$(".btn").click(function(){
    $("#"+this.id).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    sound(this.id);
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    console.log(gamePattern);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(sound){
    let aud = new Audio("sounds/"+sound);
    aud.play();
}

function sound(choice){
    switch(choice){
        case 'red': playSound("red.mp3");
        break;
        case 'green': playSound("green.mp3");
        break;
        case 'blue': playSound("blue.mp3");
        break;
        case 'yellow': playSound("yellow.mp3");
        break;
        case 'wrong': playSound("wrong.mp3");
        break;
        default: console.log("Invalid Choice in sound function.");
    }
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");

    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 200);
}

// Keyboard events:

$(document).on("keypress", function(event){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
        else{
            sound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press any Key to Restart");

            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
            console.log("Wrong!");
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

