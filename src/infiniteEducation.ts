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
gameDiv.append(scoreDisplay);

// adds first button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "📖";
bookButton.id = "bookButton";
gameDiv.append(bookButton);
