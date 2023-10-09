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
  score += val;
  scoreDisplay.innerHTML = `Score: ${score.toFixed(2)}<br><br>`;
}

bookButton.addEventListener("click", () => {
  incrementScore();
});

let start = Date.now();

function continuousGrowth() {
  //every 1/60th of a second, add 1 to the score
  if (Date.now() - start > (1 / 60) * 1000) {
    incrementScore(globalRate.rate);
    window.requestAnimationFrame(continuousGrowth);
    start = Date.now();
  } else {
    window.requestAnimationFrame(continuousGrowth);
  }
}

const upgradeButtons: Upgrade[] = [];
const globalRate = {
  rate: 0,
  setRate() {
    const rateArr = upgradeButtons.map((button) => {
      return button.amount * button.growthRate;
    });
    this.rate = rateArr.reduce((a, b) => a + b);
  },
};
class Upgrade {
  public text: string;
  public cost: number;
  public growthRate: number;
  public amount: number;
  public button: HTMLButtonElement;
  constructor(text: string, cost: number, growthRate: number) {
    this.text = text;
    this.cost = cost;
    this.amount = 0;
    this.growthRate = growthRate;
    this.button = document.createElement("button");
    this.button.innerHTML = `${this.text}<br>(${this.cost})`;
    this.button.addEventListener("click", () => {
      score -= this.cost;
      this.purchase();
      globalRate.setRate();
      this.cost *= 1.15; //cost = cost * e^(0.0716 * n-1)
    });
  }
  purchase(): void {
    this.amount++;
  }
}
upgradeButtons.push(new Upgrade("YouTube", 10, 0.1));
upgradeButtons.push(new Upgrade("Library", 100, 2.0));
upgradeButtons.push(new Upgrade("School", 1000, 50));
window.requestAnimationFrame(continuousGrowth);

// check if the buttons should be displayed
upgradeButtons.forEach((button) => {
  gameDiv.append(button.button);
  button.button.hidden = true;
});
function checkShowUpgrades(): void {
  upgradeButtons.forEach((button) => {
    if (score >= button.cost) {
      button.button.hidden = false;
      button.button.innerHTML = `${button.text}<br>(${button.cost.toFixed(
        2,
      )})<br> Owned:${button.amount} @ ${(
        button.growthRate * button.amount
      ).toFixed(2)}/s`;
    } else {
      button.button.hidden = true;
    }
  });
  window.requestAnimationFrame(checkShowUpgrades);
}
window.requestAnimationFrame(checkShowUpgrades);
