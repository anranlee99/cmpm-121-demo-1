import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Infinite Education";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// adds game container
const gameDiv: HTMLDivElement = document.createElement("div");
gameDiv.id = "gameContainer";
app.append(gameDiv);

const scoreDisplay: HTMLDivElement = document.createElement("div");
scoreDisplay.id = "scoreDisplay";
scoreDisplay.innerHTML = "Score: 0<br><br>";
scoreDisplay.style.textAlign = "center";
gameDiv.append(scoreDisplay);

// adds first button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "📖";
bookButton.id = "bookButton";
gameDiv.append(bookButton);

// score management;
let score = 0;
function incrementScore(val: number = 1) {
    score+= val;
    scoreDisplay.innerHTML = `Score: ${score.toFixed(2)}<br><br>`;

}

bookButton.addEventListener("click", () => {
    incrementScore();
});

let start = Date.now();
function continuousGrowth() {
    //every 1/60th of a second, add 1 to the score
    if(Date.now() - start > 1/60 * 1000) {
        incrementScore(1/60);
        window.requestAnimationFrame(continuousGrowth);
        start = Date.now();
    } else {
        window.requestAnimationFrame(continuousGrowth);
    }

}
window.requestAnimationFrame(continuousGrowth);