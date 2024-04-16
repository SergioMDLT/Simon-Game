var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameStarted=false;
var buttonColours=["red","blue","green","yellow"];

$(document).on("keydown",function(){
    if (!gameStarted){
        $("h1").text("Level "+level);
        nextSequence();
        gameStarted=true;
    }    
});

$(".btn").on("click",function handler(event){
    var userChosenColour=$(event.target).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (var i = 0; i < gamePattern.length; i++) {
        setTimeout(function(){
            $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
        },200);        
    };    
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
};

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
};

function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}