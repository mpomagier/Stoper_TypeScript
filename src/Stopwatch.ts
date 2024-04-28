interface StopwatchDom {
  currentTime: HTMLDivElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  [x: string]: HTMLElement;
}

abstract class Stopwatch {
  protected currentTime: number = 0;
  private timer: number | null = null;
  protected dom = <StopwatchDom>{};

  constructor(element: HTMLDivElement) {
    this.getElements(element);
    this.initActions();
    this.renderTime();
  }

  private getElements(element: HTMLDivElement): void {
    this.dom = {
      currentTime: <HTMLDivElement>(
        element.querySelector(".stopwatch__current-time")
      ),
      startBtn: <HTMLButtonElement>(
        element.querySelector(".stopwatch__start-btn")
      ),
      stopBtn: <HTMLButtonElement>element.querySelector(".stopwatch__stop-btn"),
      resetBtn: <HTMLButtonElement>(
        element.querySelector(".stopwatch__reset-btn")
      ),
    };
    /*
    Funkcja ta powinna przyjąć jako argument referencję do elementu DOM, w którym znajduje się cała struktura stopera. Następnie powinna przygotować referencję do obecnych w tym elemencie dzieci.

    Konkretnie do:
    – stopwatch__current-time,
    – wszystkich buttonów stopwatch__actions

    Wszystkie referencje dla czytelności przechowuj w obiekcie this.dom.
    */
  }

  private initActions(): void {
    this.dom.startBtn.addEventListener("click", () => this.start());
    this.dom.stopBtn.addEventListener("click", () => this.stop());
    this.dom.resetBtn.addEventListener("click", () => this.reset());
    /*
    Funkcja ta powinna nadać buttonom z buttonów stopwatch__actions odpowiednie nasłuchiwacze na event click. 
    Kliknięcie na każdy z buttonów powinno uruchamiać odpowiednie funkcje.

    Start -> start()
    Stop -> stop()
    Reset -> reset()

    Aby dostać się do tych elementów, wykorzystaj referencję przygotowane wcześniej w funkcji this.getElements.
    */
  }

  protected formatTime(time: number): string {
    const pad0 = (num: number): string =>
      num < 10 ? `0${num}` : num.toString();
    const mm = Math.floor(time / 60000);
    const ss = Math.floor((time - mm * 60000) / 1000);
    const ms = time - mm * 60000 - ss * 1000;
    return `${pad0(mm)}:${pad0(ss)}:${pad0(ms)}`;

    /*
    Funkcja ta powinna przyjmować czas w milisekundach a następnie zwracać go w formacie mm:ss:ms (np. 02:23:12).
    */
  }

  protected renderTime(): void {
    this.dom.currentTime.innerHTML = this.formatTime(this.currentTime);
    /*
    Funkcja ta powinna renderować w stopwatch__current-time zawartość obiektu this.currentTime. Oczywiście wcześniej należy sformatować czas przy użyciu funkcji this.formatTime.
    */
  }

  start(): void {
    if (this.timer === null) {
      this.timer = setInterval(() => this.step(), 1) as any as number;
    }
    /*
    Funkcja ta powinna wystartować interwał, który będzie wykonywał się co milisekundę. Powinien on każdorazowo włączać funkcję this.step

    Dla wygody przypisz ten interwał do this.timer
    */
  }

  step(): void {
    this.currentTime += 1;
    this.renderTime();
    /*
    Funkcja ta powinna zwiększać liczbę sekund w this.currentTime o jeden, a następnie uruchamiać metodę renderującą aktualny czas w HTML-u (this.renderTime).
    */
  }

  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    /*
    Funkcja ta powinna zatrzymywać interval przypisany do this.timer.
    */
  }

  reset(): void {
    this.currentTime = 0;
    this.renderTime();
    /*
    Ta funkcja powinna resetować czas zapisany w this.currentTime, a więć zmieniać jego wartość na zero. Naturalnie powinno to wiązać się również z przerenderowaniem HTML-a (this.renderTime).
    */
  }
}

export default Stopwatch;
