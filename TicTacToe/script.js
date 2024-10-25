let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset");
let newGame = document.getElementById("new")
let message =  document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");
let line = document.getElementById("draw");
let main = document.getElementById("main")
let moves = 0;
let p;

let turn = false;       //player X , player O
let win = false;

winPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],
[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


boxes.forEach(e => {
    e.addEventListener("click",()=>{
        turn=!turn
        if(turn){
            e.innerHTML="X";
            e.style.color="rgb(255, 0, 10)"
            moves++;
        }
        else{
            e.innerHTML="O";
            e.style.color="rgb(255, 50, 200)"
            moves++;
        }
        e.disabled="true";
        checkWinner();
        if(moves == 9){
            if(win){
                setTimeout(() => {
                showWinner(p1);
                main.classList.add("disable")
                }, 2000);
                win=false;
            }else{
                msgContainer.classList.remove("hide")
                message.innerText = "Match is Tie , Play Again"
                disableButtons();
            }
        }
    })
});
const disableButtons = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableleButtons = ()=>{
    for(let box of boxes){
        box.disabled = false;
    }
};
const showWinner = (w)=>{
    msgContainer.classList.remove("hide")
    message.innerText = `Congratulations , Player ${w} is Winner`
    disableButtons();
    win=true
}
const checkWinner = ()=>{
    p=1
    for (const pattern of winPattern) {
        let p1 = boxes[pattern[0]].innerText
        let p2 = boxes[pattern[1]].innerText
        let p3 = boxes[pattern[2]].innerText
        if(p1!="" && p2!="" && p3!=""){
            if(p1==p2 && p2==p3){
                boxes[pattern[0]].classList.add("color")
                boxes[pattern[1]].classList.add("color")
                boxes[pattern[2]].classList.add("color")
                chooseline(p,p1);
                localStorage.setItem("val",p)
                // showWinner();
            }
        }
        p++;
    }
}
let t;
let l;
let tr;
let Aname;
let chooseline =async (p,p1)=>{
    switch(p){
        case 1:
            t=26
            l=38
            tr=0
            break;
        case 2:
            t=47
            l=38
            tr=0
            break;
        case 3:
            t=69
            l=38
            tr=0
            break;
        case 4:
            t=23
            l=39.9
            tr=90
            break;
        case 5:
            t=23
            l=49.9
            tr=90
            break;
        case 6:
            t=23
            l=60
            tr=90
            break;
        case 7:
            t=22
            l=38
            tr=45
            break;
        case 8:
            t=22
            l=62
            tr=135
            break;
        default:
            console.log("error")
    }
    await drawLine(p,p1);
}
const drawLine = (p,p1)=>{
    line.style.top=`${t}vmin`
    line.style.left= `${l}vw`
    line.style.transform=`rotate(${tr}deg)`
    if(p1=="X"){
        line.style.backgroundColor="red"
    }else{
        line.style.backgroundColor="rgb(255, 50, 200)"
    }

    if(p==7 || p==8){
        line.classList.add("D");
    }
    else{
        line.classList.add("hr")
    }
    setTimeout(() => {
        showWinner(p1);
        main.classList.add("disable")
    }, 2000);
}
const Hide = ()=>{
    for (const box of boxes) {
        box.innerHTML=""
    }
    message.innerText=""
    moves=0;
    turn=!turn
    msgContainer.classList.add("hide")
    line.classList.remove("hr")
    line.classList.remove("D")
    main.classList.remove("disable")
    boxes[winPattern[localStorage.getItem("val")-1][0]].classList.remove("color")
    boxes[winPattern[localStorage.getItem("val")-1][1]].classList.remove("color")
    boxes[winPattern[localStorage.getItem("val")-1][2]].classList.remove("color")
    enableleButtons();
}
newGame.addEventListener("click",Hide)
reset.addEventListener("click",Hide)

