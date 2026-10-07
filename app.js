let gameSeq = [];
let userSeq = [];
let randomCls = ["red","teal","yellow","blue"];
let btns = document.querySelectorAll(".btn");
let h2  =document.querySelector("h2");
let h3  =document.querySelector("h3");
let started = false;
let level = 0
let highScore = 0;

// Game strat logic 
function startGame(){
    if(!started){
        console.log("game is started")
        started = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);

// for(let btn of btns){
//     btn.addEventListener("click", startGame)
// }

function gameFlash(btn){
    btn.classList.add("flash_btn");
    setTimeout(()=> {
        btn.classList.remove("flash_btn");
    },250)
}

function userFlash(btn){
    btn.classList.add("user_flash");
    setTimeout(()=> {
        btn.classList.remove("user_flash");
    },250)
}


function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`

    // random btn press
    // let randomIndx = Math.floor(Math.random()*randomCls.length);
    // let randomClr = randomCls[randomIndx];
    // let randBtn = document.querySelector(`.${randomClr}`)
    let randIdx = Math.floor(Math.random() * 4);
    let randBtn = btns[randIdx]; // Directly selects the button from the array
    gameSeq.push(randBtn.getAttribute("id"));
    console.log(gameSeq)
    gameFlash(randBtn);
}

function checkResult(indx){
    if(gameSeq[indx] === userSeq[indx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelUp,1000)
        }
    }
    else{
        h2.innerHTML = `GAME OVER! <b> your score was ${level}</b> <br> press any key to start`;
        document.querySelector("body").style.backgroundColor= "#E73F1E"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= "white"
        },250)
        highestScore();
        reset();
    }
}

function btnPress(){
     if (!started) return;
    let btn = this;
    // console.log(btn)
    userFlash(btn);
    let userColor = btn.getAttribute("id")
    userSeq.push(userColor)
    checkResult(userSeq.length-1)
}

for(let btn of btns){
    btn.addEventListener("click",btnPress);
}
function highestScore(){
    if(level > highScore){
        highScore =level;
    }
     h3.innerHTML = `Highest Score: ${level}`
}


function reset(){
    started = false;
    gameSeq= [];
    userSeq = [];
    level = 0;
}


