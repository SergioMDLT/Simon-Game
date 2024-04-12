var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameStarted=false;
var rightAnswer=true;
var buttonColours=["red","blue","green","yellow"];

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
};

$(document).on("keydown",function(){
    if (level===0){
        nextSequence();
        gameStarted=true;
        $("h1").text("Level "+level);
    }    
});

function nextSequence(){
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    for (var i = 0; i < gamePattern.length; i++) {
        setTimeout(function(){
            $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
        },200);        
    };    
    level++;
};

function checkAnswer() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            console.log("wrong");
            $("body").addClass("game-over");
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout($("body").removeClass("game-over"),200);
            return;
        }
    }
    console.log("success");
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
}

$(".btn").on("click",function handler(event){
    var userChosenColour=$(event.target).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length);
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
};