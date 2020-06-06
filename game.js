var main=document.getElementById("main");
var first = document.getElementById("border1");
var register=document.getElementById("border2");
var player=document.getElementById("border3");
var final=document.getElementById("finalgame");
var ss=document.querySelectorAll('.cell');
let p1=document.getElementById("p1");
let p2=document.getElementById("p2");
const winningConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],[2, 4, 6]];

register.remove();
player.remove();
final.remove();



function adduser()
{
var name = document.getElementById("runame").value;
name.required;
var pass = document.getElementById("rpass").value;
var newdatas = {"name": name, "pass": pass};
datas.push(newdatas);
alert("Registered Successfully!! \n Login to Continue");
openLogin();
}
function letsplay()
{
register.remove();
player.remove();
first.remove();
main.appendChild(final);
finalpage(); 
}
function registerpage()
{
    first.remove();
    player.remove();
    final.remove();
    main.appendChild(register);
}
function openLogin()
{
register.remove();
player.remove();
main.appendChild(first);
}
function playerpage()
{
    logincheck();
}
   
var datas = [{name: "shiva", pass: "sree"},{name: "pavi", pass:"pavi"}];

function logincheck(){
    var name = document.getElementById("uname").value;
    var pass = document.getElementById("pass").value;
    var flag = false;
    for(let i=0;i<datas.length;i++)
    {
        if(datas[i].name == name && datas[i].pass == pass)
            flag = true;
    }    
    
    if(flag)
    {
        alert("Login Successful!!!!");
        enterPlayer();
    }
    else
        alert("Incorrect Username or Password \n Haven't you registered yet??");
}
function enterPlayer(){
    register.remove();
    first.remove();
    main.appendChild(player);
}
// code for the game----------------------------------------------------------------------------------------
function finalpage()
{  
    const statusDisplay = document.getElementById("game-status");
    let gameActive = true;
    let currentPlayer = "X";
    var cp=p1.value;
    console.log(cp);
    let gameState = ["", "", "", "", "", "", "", "", ""];
    var r=document.getElementById('restart');
    const winningMessage = () =>{ return  `congrats! ${cp} you won the match!`};
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${cp}'s turn`;
    statusDisplay.innerHTML = currentPlayerTurn();
    ss.forEach(cell => cell.addEventListener('click', currentCell));
    function currentCell(event) 
{
  const clickedCell = event.target;
  const index = parseInt(clickedCell.getAttribute('data-cell-index'));
  if (gameState[index] !== "" || !gameActive) 
  {
  return;
  }
  handleCellPlayed(clickedCell, index);
  checkWin();
}

function handleCellPlayed(clickedCell, index) 
{
    gameState[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function swap()
 {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    cp=currentPlayer;
    cp = cp === "X" ? p1.value : p2.value;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin() {
    let win = false;
    for (let i = 0; i <= 7; i++)
     {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '')
         {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break
        }
    }

    if (win) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let draw = !gameState.includes("");//check if any cell is empty//returns true or false
    if (draw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
     swap();
}
r.addEventListener('click',restartGame);// on click restart
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
   }
}

