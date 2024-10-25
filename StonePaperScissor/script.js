let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.getElementById("msg");
const uScore = document.getElementById("user-score");
const cScore = document.getElementById("comp-score");
const newButton = document.getElementById("new");

const genComprChoice = ()=>{
    const options = ["rock","paper","scissors"];
    const a = Math.floor(Math.random()*3);
    return options[a];
};

const drawGame = ()=>{
    msg.innerText="Game was Draw. Play again"
    msg.style.backgroundColor='purple'
    msg.classList.remove("Weffect")
    msg.classList.remove("Leffect")
    msg.classList.add("Deffect")
}

const showWinner = (userWin,userChoice,compChoice)=>{
    if(userWin){
        msg.innerText=`You Win! Your ${userChoice} Beats ${compChoice}`
        msg.style.backgroundColor="blue"
        msg.classList.remove("Deffect")
        msg.classList.remove("Leffect")
        msg.classList.add("Weffect")
        uScore.innerText=`${++userScore}`
    }else{
        msg.innerText=`You Lose! ${compChoice} Beats Your ${userChoice}`
        msg.style.backgroundColor="red";
        msg.classList.remove("Deffect")
        msg.classList.remove("Weffect")
        msg.classList.add("Leffect")
        cScore.innerText=`${++compScore}`
    }
}

const playGame = (userChoice)=>{
    const compChoice = genComprChoice();
    if(userChoice === compChoice){
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true ;
        }else if(userChoice === "paper"){
            userWin = compChoice === "scissors" ? false : true ;
        }else{
            userWin = compChoice === "rock" ? false : true ;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach(choice => {
    choice.addEventListener("click", ()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const newGame = ()=>{
    msg.innerText="Play your move"
    msg.style.backgroundColor="#081b31"
    msg.classList.remove("Weffect")
    msg.classList.remove("Leffect")
    msg.classList.remove("Deffect")
    uScore.innerText="0"
    cScore.innerText="0"
    userScore=0;
    compScore=0;
}

newButton.addEventListener("click", newGame)

