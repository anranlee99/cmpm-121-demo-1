import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Infinite Education";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const scoreDisplay: HTMLDivElement = document.createElement("h2");
scoreDisplay.id = "scoreDisplay";
scoreDisplay.innerHTML = "Knowledge: 0<br><br>";
scoreDisplay.style.textAlign = "center";
app.append(scoreDisplay);

// adds first button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "📖";
bookButton.style.fontSize = "100px";
bookButton.id = "bookButton";
bookButton.style.width = "500px";
bookButton.style.height = "200px";
app.append(bookButton);

// score management;
let score = 0;
function incrementScore(val: number = 1) {
  score += val;
  scoreDisplay.innerHTML = `Knowledge: ${score.toFixed(2)}<br><br>`;
}

bookButton.addEventListener("click", () => {
  incrementScore();
});

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
  public description: string;
  private tooltip: HTMLDivElement;
  constructor(
    text: string,
    cost: number,
    growthRate: number,
    description: string,
  ) {
    this.text = text;
    this.cost = cost;
    this.amount = 0;
    this.growthRate = growthRate;
    this.button = document.createElement("button");
    this.button.style.width = "250px";
    this.description = description;

    this.button.innerHTML = `${this.text}<br>(${this.cost.toFixed(
      2,
    )})<br> Owned:${this.amount} @ ${(this.growthRate * this.amount).toFixed(
      2,
    )}/s`;

    this.button.addEventListener("click", this.purchase.bind(this));
    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip");
    this.tooltip.textContent = this.description;

    // Add an event listener for mouseover and mouseout to show/hide the tooltip
    this.button.addEventListener("mouseover", this.showTooltip.bind(this));
    this.button.addEventListener("mouseout", this.hideTooltip.bind(this));
  }
  purchase(): void {
    score -= this.cost;
    this.cost *= 1.15;
    this.amount++;
    globalRate.setRate();
  }
  showTooltip(event: MouseEvent): void {
    const tooltipOffset = 10; // Adjust this value as needed for positioning

    this.tooltip.style.left = `${event.clientX + tooltipOffset}px`;
    this.tooltip.style.top = `${event.clientY + tooltipOffset}px`;

    document.body.appendChild(this.tooltip);
  }

  // Method to hide the tooltip
  hideTooltip(): void {
    if (this.tooltip.parentElement) {
      this.tooltip.parentElement.removeChild(this.tooltip);
    }
  }
}
const upgradeButtons: Upgrade[] = [
  new Upgrade(
    "YouTube Tutorials",
    10,
    0.1,
    "Self learning is often the best start to a new skill",
  ),
  new Upgrade(
    "Library",
    100,
    2.0,
    "Books and free resources at the library help you expand your horizons",
  ),
  new Upgrade("School", 1000, 50, "Time for a more structured understanding"),
  new Upgrade(
    "Pay for Research",
    10000,
    100,
    "You've got to find new knowledge when it's not available",
  ),
  new Upgrade(
    "Neuro Enhancements",
    100000,
    500,
    "Limitations of the human brain are no longer a problem",
  ),
  new Upgrade(
    "Simulate Universes",
    1000000,
    1000,
    "You can now learn about what was previously inaccessible",
  ),
];

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
window.requestAnimationFrame(continuousGrowth);

// check if the buttons should be displayed
upgradeButtons.forEach((button) => {
  app.append(button.button);
  button.button.disabled = true;
});
function checkShowUpgrades(): void {
  upgradeButtons.forEach((button) => {
    if (score >= button.cost) {
      button.button.disabled = false;
      button.button.innerHTML = `${button.text}<br>(${button.cost.toFixed(
        2,
      )})<br>Owned:${button.amount} @ ${(
        button.growthRate * button.amount
      ).toFixed(2)}/s`;
    } else {
      button.button.disabled = true;
    }
  });
  window.requestAnimationFrame(checkShowUpgrades);
}
window.requestAnimationFrame(checkShowUpgrades);
