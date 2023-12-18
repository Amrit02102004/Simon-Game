// Functions
function getRandomNumber() {
  return Math.floor(Math.random() * 4);
}

var red = new Audio("sounds/red.mp3");
var green = new Audio("sounds/green.mp3");
var blue = new Audio("sounds/blue.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");

function playAudio(aud) {
  aud.play();
}
function handleClick(self) {
  if (self.hasClass("green")) {
    clicked.push(0);
    playAudio(green);
  }
  if (self.hasClass("red")) {
    clicked.push(1);
    playAudio(red);
  }
  if (self.hasClass("yellow")) {
    clicked.push(2);
    playAudio(yellow);
  }
  if (self.hasClass("blue")) {
    clicked.push(3);
    playAudio(blue);
  }
}

function handleClic(str) {
  self = $(str);
  if (self.hasClass("green")) {
    playAudio(green);
  }
  if (self.hasClass("red")) {
    playAudio(red);
  }
  if (self.hasClass("yellow")) {
    playAudio(yellow);
  }
  if (self.hasClass("blue")) {
    playAudio(blue);
  }
}

function animClick(clk, dl = 200) {
  clk.addClass("pressed");
  setTimeout(function () {
    clk.removeClass("pressed");
  }, dl);
}

function inclevel() {
  level++;
  let num = getRandomNumber();
  animClick($("." + clrodr[num]), 500);
  handleClic($("." + clrodr[num]));
  currentStack.push(num);
  if (level !== -1) $("#level-title").text("Level " + (level+1).toString());
}

function matchArray(arr1, arr2) {
  if (arr1.length <= arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// Variable Declarations
let randomNumber = [];
let currentStack = [];
let clicked = [];
let level = -1;
let clrodr = ["green", "red", "yellow", "blue"];

$(".btn").click(function () {
  if (!$(".btn").hasClass("disabled")) {
    if (currentStack.length == 0) {
      inclevel();
    } else {
      var self = $(this);
      animClick(self);
      handleClick(self);

      if (matchArray(clicked, currentStack)) {
        if (clicked.length === currentStack.length) {
          setTimeout(() => {
            inclevel();
            clicked = [];
          }, 1000);
        }
      } else {
        playAudio(wrong);
        $(".btn").addClass("disabled");
        $(".bd").addClass("game-over");
        $("#level-title").text("Game Over!!!");
        $(".reset").removeClass("hidden");

      }
    }
  }
});

$(".reset").click(()=>{
    clicked = [];
    currentStack = [];
    level = -1;
    $(".btn").removeClass("disabled");
    $(".bd").removeClass("game-over");
    $("#level-title").text("Press any button to start");
    $(".reset").addClass("hidden");
})
