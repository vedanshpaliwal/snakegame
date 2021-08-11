// console.log("hey this is woking")

let inputdir = { x: 0, y: 0 };
const foodsound = new Audio('Eat.mp3');
const gameoversound = new Audio('Gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('bgsound.mp3');
let speed = 16;
let score = 0;
let lastPaintTime = 0;
let snakearr = [{
    x: 13, y: 15
}]
food = { x: 6, y: 7 }
//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameengine();
}

function iscollide(snake) {
    //agar snake khud ke andar 
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }

}
function gameengine() {

    //updating the snake
    if (iscollide(snakearr)) {
        musicsound.pause();
        gameoversound.play();
        inputdir = { x: 0, y: 0 };
        alert("Game Over,Press any key to play again");
        snakearr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }
    //if we have eaten the food and add the score
    if (snakearr[0].y == food.y && snakearr[0].x == food.x) {
        foodsound.play();
        score += 1;
        if(score>highscorevalue){
            highscore = score;
            localStorage.setItem("HighScore" ,JSON.stringify(highscore))
            highscore.innerHTML = "Highscore " + highscore;
        }
        scorebox.innerHTML = "score:" + score;
        snakearr.unshift({ y: snakearr[0].y + inputdir.y, x: snakearr[0].x + inputdir.x })   //unshift add kr deta hai
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //move the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;



    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeelement.classList.add('head');
        }
        else {
            snakeelement.classList.add('snake');

        }
        board.appendChild(snakeelement);
    })

    //display the food
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food')
    board.appendChild(foodelement);

}



let highscore = localStorage.getItem('highscore');
if(highscore == null)
{
    let highscorevalue;
    localStorage.setItem('highscore',JSON.stringify(highscorevalue));
}
else{
    highscorevalue = JSON.parse(highscore)
    highscore.innerHTML = "HighScore" + highscorevalue;
}

//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 } //start the game
    musicsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");

            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");

            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");

            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});
