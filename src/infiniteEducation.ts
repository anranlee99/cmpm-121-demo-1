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

let score = 0;
bookButton.addEventListener("click", () => {
  score++;
  scoreDisplay.innerHTML = `Score: ${score}<br><br>`;
});

function incrementScore(val: number = 1) {
    score+= val;
    scoreDisplay.innerHTML = `Score: ${score}<br><br>`;

}

setInterval(incrementScore, 1000);