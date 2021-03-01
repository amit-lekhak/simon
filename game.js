var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var buttonColors = [
  "red", "blue", "green", "yellow"
];

var started = false;

$("body").on("keypress", function() {

  if (!started) {

    nextSequence();
    started = true;
  }

});


$(".btn").on("click", function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
});


function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);


  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  // console.log(gamePattern);



  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");

  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
