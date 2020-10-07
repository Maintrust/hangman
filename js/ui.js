class UI {
  constructor() {
    this.body = document.body;
    this.documentWrapper = document.querySelector(".wrapper");
    this.input = document.getElementById("input");
    this.button = document.querySelector("button");
    this.form = document.getElementById("form");
    this.appContainer = document.getElementById("app");
    this.lettersContainer = document.querySelector(".letters-container");
    this.spans = "letter-span";
    this.wrongLettersField = "wrong-letters-field";
    this.endGameMessageWin = "end-game-msg end-game-win";
    this.endGameMessageLost = "end-game-msg end-game-lost";
    this.keyboardWrapperId = "keyboard";

    this.alphabet = [
      ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
      ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ё"],
      ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
    ];
  }

  initGame(length) {
    const loader = document.createElement("div");

    // рисуем лоадер
    loader.className = `cssload-thecube`;
    loader.innerHTML = `
    <div class="cssload-cube cssload-c1"></div>
    <div class="cssload-cube cssload-c2"></div>
    <div class="cssload-cube cssload-c4"></div>
    <div class="cssload-cube cssload-c3"></div>
    `;
    this.appContainer.appendChild(loader);

    // отрубаем лоадер, добавляем виселицу и спаны
    setTimeout(() => {
      document.querySelector(".cssload-thecube").remove();
      this.appContainer.innerHTML = svgHtml;
      this.appContainer.appendChild(lettersDiv);
    }, 1000);

    // рисуем виселицу и поле для неправильны букв
    const svgHtml = `<svg
    width="150"
    height="250"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="6"
      x2="66"
      y1="220"
      y2="220"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
    />
    <line
      x1="36"
      x2="36"
      y1="30"
      y2="220"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
    />
    <line
      x1="36"
      x2="110"
      y1="30"
      y2="30"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
    />
    <line
      x1="110"
      x2="110"
      y1="30"
      y2="70"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
    <circle
      cx="110"
      cy="85"
      r="15"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
    <line
      x1="110"
      x2="110"
      y1="100"
      y2="160"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
    <line
      x1="110"
      x2="80"
      y1="110"
      y2="130"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
    <line
      x1="110"
      x2="140"
      y1="110"
      y2="130"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
    <line
      x1="110"
      x2="80"
      y1="160"
      y2="190"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
    <line
      x1="110"
      x2="140"
      y1="160"
      y2="190"
      stroke="orange"
      fill="transparent"
      stroke-width="5"
      stroke-linecap="round"
      style="display:none"
      class='step'
    />
  </svg>
  <div id="wrong-letters">
    <p>Неправильные</p>
    <p id="${this.wrongLettersField}"></p>
  </div>`;

    // рисуем спаны для букв
    const lettersDiv = document.createElement("div");
    lettersDiv.className = "letters";
    const lettersContainer = document.createElement("div");
    lettersContainer.className = "letters-container";
    for (let x = 0; x < length; ++x) {
      lettersContainer.innerHTML += `<span class='${this.spans}'></span>`;
    }
    lettersDiv.appendChild(lettersContainer);
    lettersDiv.innerHTML += `</div>`;
  }

  clearInput() {
    input.value = "";
  }

  typeLetter(letter, pos) {
    const spans = document.querySelectorAll("." + this.spans);
    spans[pos].textContent = letter;
  }

  typeWrongLetter(letter) {
    const wrongField = document.getElementById(this.wrongLettersField);
    if (wrongField.textContent.length === 0) {
      wrongField.textContent += letter;
    } else {
      wrongField.textContent += ", " + letter;
    }
    Array.from(document.querySelector("svg").children).filter(
      (child) => child.style.display == "none"
    )[0].style.display = "initial";
  }

  showMessage(message) {
    const div = document.createElement("div");
    div.className = this.endGameMessageLost;
    div.innerHTML = `<div><h4>${message}</h4><button onclick="(()=>location.reload())()">Play again?</button></div>`;
    this.body.appendChild(div);
  }

  initKeyboard() {
    const keyboardWrapper = document.createElement("div");
    keyboardWrapper.id = this.keyboardWrapperId;
    for (let x = 0; x < this.alphabet.length; ++x) {
      const row = document.createElement("div");
      row.className = `row-${x + 1}`;
      for (let y = 0; y < this.alphabet[x].length; ++y) {
        row.innerHTML += `<div class='letter'><span>${this.alphabet[x][y]}</span></div>`;
      }
      keyboardWrapper.appendChild(row);
    }
    this.documentWrapper.appendChild(keyboardWrapper);
    return this.keyboardWrapperId;
  }
}

export const UICtrl = new UI();
