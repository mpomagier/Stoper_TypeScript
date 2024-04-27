import Stopwatch from "./Stopwatch.js";

class StopwatchWithResults extends Stopwatch {
  results: string[] = [];

  constructor(element: HTMLDivElement) {
    super(element);
    this.prepareElements(element);
    this.prepareActions();
  }

  prepareElements(element: HTMLDivElement): void {
    this.dom.resultsList = element.querySelector(".stopwatch__results")!;
    this.dom.addToListBtn = element.querySelector(
      ".stopwatch__add-to-list-btn"
    )!;
    this.dom.resetListBtn = element.querySelector(
      ".stopwatch__reset-list-btn"
    )!;
  }

  prepareActions(): void {
    this.dom.addToListBtn.addEventListener("click", () => this.addToList());
    this.dom.resetListBtn.addEventListener("click", () => this.resetList());
    /*
    Funkcja ta powinna dodawać nasłuchwiacze do buttonów this.dom.addToListBtn oraz this.dom.resetListBtn. Pierwszy powinien po kliknięciu uruchamiać metodę this.addToList, a druga this.resetList.
    */
  }

  renderList(): void {
    this.dom.resultsList.innerHTML = "";
    this.results.forEach((time) => {
      const timeArray = time.split(":").map(Number);
      const milliseconds =
        timeArray[0] * 60000 + timeArray[1] * 1000 + timeArray[2];
      const formattedTime = this.formatTime(milliseconds);

      const li = document.createElement("li");
      li.textContent = formattedTime;
      this.dom.resultsList.appendChild(li);
    }); /*
    Funkcja ta powinna czyścić zawartość this.dom.resultsList, a następnie renderować w niej nowe elementy li na podstawie zawartości tablicy this.results. Każdy jej element powinien być renderowany bez żadnych zmian.

    np. <li>00:12:00</li>
    */
  }

  addToList(): void {
    const formattedTime = this.formatTime(this.currentTime);
    this.results.push(formattedTime);
    this.renderList();
    /*
    Funkcja ta powinna pobierać aktualny czas z this.currentTime, formatować go i w takiej postaci zapisywać do tablicy this.results. Następnie powinna renderować aktualną listę na stronie (this.renderList).
    */
  }

  resetList(): void {
    this.results = [];
    this.dom.resultsList.innerHTML = "";
    /*
    Funkcja ta powinna czyścić tablicę this.results oraz zawartość this.dom.resultsList
    */
  }
}

export default StopwatchWithResults;
