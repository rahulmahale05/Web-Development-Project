let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset");
let newGame = document.getElementById("new");
let message = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");
let main = document.getElementById("main");
let moves = 0;
let p;

let turn = false; // player X , player O
let win = false;

winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach(e => {
    e.addEventListener("click", () => {
        turn = !turn;
        if (turn) {
            e.innerHTML = "X";
            e.style.color = "rgb(255, 0, 10)";
        } else {
            e.innerHTML = "O";
            e.style.color = "rgb(255, 50, 200)";
        }
        moves++;
        e.disabled = true;
        checkWinner();
        if (moves == 9) {
            if (!win) {
                msgContainer.classList.remove("hide");
                message.innerText = "Match is Tie , Play Again";
                disableButtons();
            }
        }
    });
});

const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
};

const showWinner = (w) => {
    msgContainer.classList.remove("hide");
    message.innerText = `Congratulations , Player ${w} is Winner`;
    disableButtons();
    win = true;
};

const checkWinner = () => {
    for (const pattern of winPattern) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1 !== "" && p1 === p2 && p2 === p3) {
            boxes[pattern[0]].classList.add("color");
            boxes[pattern[1]].classList.add("color");
            boxes[pattern[2]].classList.add("color");
            showWinner(p1);
        }
    }
};

const Hide = () => {
    for (const box of boxes) {
        box.innerHTML = "";
        box.classList.remove("color");
    }
    message.innerText = "";
    moves = 0;
    turn = false;
    msgContainer.classList.add("hide");
    main.classList.remove("disable");
    enableButtons();
};

newGame.addEventListener("click", Hide);
reset.addEventListener("click", Hide);
