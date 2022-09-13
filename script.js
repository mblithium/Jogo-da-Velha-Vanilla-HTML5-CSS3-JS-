const squares = document.body.querySelectorAll(".valueSquare");
const imagesPath = { "cross": "./img/cross.svg", "circle": "./img/circle.svg" };
const gameData = ["", "", "", "", "", "", "", "", ""];
const playerData = { "actualPlayer": ["PlayerOne", "PlayerTwo"], "PlayerOne": "cross", "PlayerTwo": "circle", "isLocked": false };
const playerScreenValue = document.body.querySelector("#playerScreenValue");


function resetValues() {
  gameData.forEach((elem, index) => gameData[index] = "");
  squares.forEach((elem, index) => {
    squares[index].style = "background-color: #6c5ce7"
  })
  playerScreenValue.innerHTML = "";
  playerData.isLocked = false;
  updateScreen()
}

function addAction() {
  squares.forEach(function(elem) {
    elem.addEventListener("click", (elem) => playerAction(elem, playerData.actualPlayer[0]))
  })
}

function playerAction(elem, player) {
  const actPlayer = player;
  const elemId = Number(elem.target.id.slice(2)) - 1;
  if ( !verifySquare(elemId, actPlayer) && elemId != -1 && playerData.isLocked == false) {
    changeValue((elemId), (playerData.actualPlayer));
    switchPlayer();
    verifyRule(gameData);
  };
}

function verifySquare(id, player) {
  return gameData[id] === "circle" || gameData[id] === "cross";
  /* refactoring
  if (
    gameData[id] === "circle" || 
    gameData[id] === "cross"
  ) { return true; } 
  else { return false; } */
}

function changeValue(pos) {
  const player = playerData.actualPlayer[0];
  if (player == "PlayerOne") {
    gameData[pos] = "cross";
  } else if (player == "PlayerTwo") {
    gameData[pos] = "circle";
  }
}
function switchPlayer() {
  if (playerData.actualPlayer === "") { playerData.actualPlayer = ["PlayerOne", "PlayerTwo"]; }
  [playerData.actualPlayer[0], playerData.actualPlayer[1]] = [playerData.actualPlayer[1], playerData.actualPlayer[0]];
  updateScreen();
}

function updateScreen() {
  playerScreenValue.innerHTML = playerData.actualPlayer[0].replace("Player", "Player ");
  for (i = 0; i < 9; i++) {
    switch (gameData[i]) {
      case "cross":
        squares[i].innerHTML = `<img src="${imagesPath.cross}"></img>`;
        break;
      case "circle":
        squares[i].innerHTML = `<img src="${imagesPath.circle}"></img>`;
        break;
      default:
        squares[i].innerHTML = "";
    }
  }
   
}

function game() {
  return false;
}

function verifyRule(gameData) {
    const gd = gameData;
  
  /* REGRAS */
  /* Obs: criar outra forma, só que com loops... */
  
  // Horizontal (Linhas)
  if (gd[0] == gd[1] && gd[1] == gd[2] && gd[0] != "") { velha(gd[0], [0, 1, 2]); }
  if (gd[3] == gd[4] && gd[3] == gd[5] && gd[3] != "") { velha(gd[3], [3, 4, 5]); }
  if (gd[6] == gd[7] && gd[6] == gd[8] && gd[6] != "") { velha(gd[6], [6, 7, 8]); }

  // Vertical (Colunas)
  if (gd[0] == gd[3] && gd[0] == gd[6] && gd[0] != "") { velha(gd[0], [0, 3, 6]); }
  if (gd[1] == gd[4] && gd[1] == gd[7] && gd[1] != "") { velha(gd[1], [1, 4, 7]); }
  if (gd[2] == gd[5] && gd[2] == gd[8] && gd[2] != "") { velha(gd[2], [2, 5, 8]); }

  // Diagonal ( X )
  if (gd[0] == gd[4] && gd[0] == gd[8] && gd[0] != "") { velha(gd[0], [0, 4, 8]); }
  if (gd[2] == gd[4] && gd[2] == gd[6] && gd[2] != "") { velha(gd[2], [2, 4, 6]); }

  function playerConvert(p) {
    if (p == "cross") return "Jogador Um";
    if (p == "circle") return "Jogador Dois";
  }

  function velha(player, ids) {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(player)}`);
    ids.forEach((elem) => {
      console.log(elem);
      squares[elem].style = "background-color: #00b894;"
    })
    playerData.isLocked = true;
  }
  
}


resetValues()
addAction();
updateScreen()