const jsConfetti = new JSConfetti();
$(document).ready(function () {
  let gameLevel = true;
  modalForLevel();
  $("#levelEasy, #levelHard").click((e) => {
    intervalManager(true, 2000);
    $("#levelModal").modal("hide");
    if (e.target.id == "levelEasy") {
      gameLevel = true;
      $("span").text("Game Level: Normal");
    } else if (e.target.id == "levelHard") {
      gameLevel = false;
      $("span").text("Game Level: Impossible");
    }
  });

  var rps = ["rock", "paper", "scissors"];
  const normalBorder = "3px solid #3f3f3f";
  const chosenBorder = "3px solid #fa7070";

  var player1 = $("#player-1");
  var player2 = $("#player-2");
  var hands = $(".hands");
  let attack,
    item = null;

  $("#paper, #rock, #scissor").click((e) => {
    if (e.target.id == "rock") {
      attack = "rock";
      $("#rock").css("border", chosenBorder);
      $("#paper, #scissor").css("border", normalBorder);
    } else if (e.target.id == "paper") {
      attack = "paper";
      $("#paper").css("border", chosenBorder);
      $("#rock, #scissor").css("border", normalBorder);
    } else if (e.target.id == "scissor") {
      attack = "scissors";
      $("#scissor").css("border", chosenBorder);
      $("#rock, #paper").css("border", normalBorder);
    }
  });

  $("#start").click(() => {
    resetDisplay();
    $("#myModal").modal("hide");
    $("#paper, #rock, #scissor").css("border", normalBorder);

    if (!gameLevel) {
      if (attack == "rock") {
        item = "paper";
      } else if (attack == "paper") {
        item = "scissors";
      } else if (attack == "scissors") {
        item = "rock";
      }
    } else {
      item = rps[Math.floor(Math.random() * rps.length)];
    }
    $(hands).addClass("animate__animated animate__bounce animate__slow");

    setTimeout(() => {
      $(player1).attr("src", `./images/${attack}.png`);
      $(player2).attr("src", `./images/${bot(item)}_right.png`);
      setTimeout(() => {
        $(hands).removeClass("animate__bounce");
        startGame(attack, item);
      }, 1500);
    }, 1500);

    $("#choose-attack, #reset-game").addClass("disabled");
    setTimeout(() => {
      resetDisplay();
    }, 4000);
    setTimeout(() => {
      $("#choose-attack, #reset-game").removeClass("disabled");
    }, 4000);
  });

  $("#changeLevel").click(() => {
    intervalManager(false);
    $("#losingModal").modal("hide");
    $("#levelModal").modal("show");
    resetDisplay();
    $(".player-score, .bot-score").text("0");
    $("h1").text("Rock, Paper, Scissor");
    $("#losingModal").modal("hide");
  });

  $("#restartLevel").click(() => {
    intervalManager(false);
    $(".player-score, .bot-score").text("0");
    $("#losingModal").modal("hide");
    resetDisplay();
    $("h1").text("Rock, Paper, Scissor");
  });
});

const intervalManager = (flag, time) => {
  let intervalID = null;

  if (flag) {
    intervalID = setInterval(checkScore, time);
  } else {
    clearInterval(intervalID);
  }
};

const checkScore = () => {
  
  let playerPoints = parseInt($(".player-score").text());
  let botPoints = parseInt($(".bot-score").text());
  if (parseInt(playerPoints) === 5) {
    $("#losingModal h2").text("You Win!").css("font-size", "4rem");
    $("#losingModal").modal("show");
    jsConfetti.addConfetti();
  } else if (parseInt(botPoints) === 5) {
    $("#losingModal h2").text("You Lose!").css("font-size", "4rem");
    $("#losingModal").modal("show");
  }
};

const resetDisplay = () => {
  $("#player-2").attr("src", `./images/rock_right.png`);
  $("#player-1").attr("src", `./images/rock.png`);
};

const startGame = (user, bot) => {
  let userAttack = user;
  let botAttack = bot;

  if (userAttack && botAttack) {
    let playerScore = $(".player-score");
    let botScore = $(".bot-score");

    if (userAttack == "rock" && botAttack == "scissors") {
      $(playerScore).text(parseInt($(playerScore).text()) + 1);
      $("h1").text("You win!");
    } else if (userAttack == "paper" && botAttack == "rock") {
      $(playerScore).text(parseInt($(playerScore).text()) + 1);
      $("h1").text("You win!");
    } else if (userAttack == "scissors" && botAttack == "paper") {
      $(playerScore).text(parseInt($(playerScore).text()) + 1);
      $("h1").text("You win!");
    } else if (userAttack == "rock" && botAttack == "paper") {
      $(botScore).text(parseInt($(botScore).text()) + 1);
      $("h1").text("Bot win!");
    } else if (userAttack == "paper" && botAttack == "scissors") {
      $(botScore).text(parseInt($(botScore).text()) + 1);
      $("h1").text("Bot win!");
    } else if (userAttack == "scissors" && botAttack == "rock") {
      $(botScore).text(parseInt($(botScore).text()) + 1);
      $("h1").text("Bot win!");
    } else {
      $("h1").text("Draw");
    }
  }
};

// const chooseAttack = async (userChoice, botAttack) => {
//   let playerScore = $(".player-score");
//   let botScore = $(".bot-score");
//   if (userChoice == "rock" && botAttack == "scissors") {
//     $(playerScore).text(parseInt($(playerScore).text()) + 1);
//     $("h1").text("You win!");
//   } else if (userChoice == "paper" && botAttack == "rock") {
//     $(playerScore).text(parseInt($(playerScore).text()) + 1);
//     $("h1").text("You win!");
//   } else if (userChoice == "scissors" && botAttack == "paper") {
//     $(playerScore).text(parseInt($(playerScore).text()) + 1);
//     $("h1").text("You win!");
//   } else if (userChoice == "rock" && botAttack == "paper") {
//     $(botScore).text(parseInt($(botScore).text()) + 1);
//     $("h1").text("Bot Win!");
//   } else if (userChoice == "paper" && botAttack == "scissors") {
//     $(botScore).text(parseInt($(botScore).text()) + 1);
//     $("h1").text("Bot Win!");
//   } else if (userChoice == "scissors" && botAttack == "rock") {
//     $(botScore).text(parseInt($(botScore).text()) + 1);
//     $("h1").text("Bot Win!");
//   } else {
//     $("h1").text("Draw");
//   }
// };

const bot = (attack) => {
  return attack;
};

const modalForLevel = () => {
  const modal = `
   <div class="modal fade" id="levelModal" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal body -->
                    <div class="modal-body text-center">
                        <h2 class="text-center">Choose Difficulty</h2>
                        <button class="btn btn-secondary" id="levelEasy">
                            Normal
                        </button>

                        <button class="btn btn-secondary" id="levelHard">
                            Impossible
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
  $("main").append(modal);
  $("#levelModal").modal("show");
};
