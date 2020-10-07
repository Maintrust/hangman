import { preventCtrl } from "./preventOrientation.js";
import GameCtrl from "./game.js";
import { UICtrl } from "./ui.js";

const appInit = (function (GameCtrl, UICtrl) {
  function initEventListeners(UICtrl) {
    /// script to able/disable button
    UICtrl.input.oncut = UICtrl.input.blur = UICtrl.input.onpaste = UICtrl.input.onkeyup = buttonSwitcher;

    // flag input focus/not focus
    UICtrl.input.onfocus = function () {
      // console.log(this);
      this.focused = true;
    };
    UICtrl.input.onblur = function () {
      this.focused = false;
    };

    /// shows alert if device orientation is changed
    // window.addEventListener("orientationchange", preventCtrl.deviceOrientation);

    document.addEventListener("keydown", checkKey);
    UICtrl.form.addEventListener("submit", initCustomGame);
    const keyboardWrapperId = UICtrl.initKeyboard();
    // document
    //   .getElementById(`${keyboardWrapperId}`)
    //   .addEventListener("click", typeLetter);
    document.querySelectorAll(".letter").forEach((elem) => {
      elem.addEventListener("click", typeLetter);
    });
  }

  function buttonSwitcher() {
    setTimeout(() => {
      if (UICtrl.input.value === "") {
        UICtrl.button.disabled = true;
      } else {
        UICtrl.button.disabled = false;
      }
    }, 100);
  }

  function initCustomGame(e) {
    if (checkKey(e)) {
      const length = GameCtrl.initGame(e.target.firstElementChild.value);
      //console.log(length);
      UICtrl.initGame(length);

      buttonSwitcher();
    } else {
      console.log("NOT CYRILLIC");
    }
    UICtrl.clearInput();
    UICtrl.input.blur();
    e.preventDefault();
  }

  function checkKey(e) {
    const regExp = /^[а-яА-ЯёЁ]+$/i;
    // какое событие происходит?
    /// Проверяем, является ли событие кейдауном и не делается ли это в инпут
    if (e.type === "keydown" && !UICtrl.input.focused) {
      // если проиграли ничего не делаем
      if (GameCtrl.getTries() === 0 || GameCtrl.getLettersLeft() === 0) {
        return;
      }
      /// Проверяем, кириллица ли это
      if (regExp.test(e.key)) {
        // приводим к общему виду
        let letter = e.key;
        letter = letter.toLowerCase();
        /// Проверяем, вводили ли букву раньше
        if (!GameCtrl.isLetterTypedBefore(letter)) {
          //console.log("cyrillic");
          const letterPosition = GameCtrl.getLetterPosition(letter); // возвращается массив позиций (так как одинаковых букв может быть несколько)
          //console.log(letterPosition);
          // работаем с массивом позиций
          if (letterPosition.length === 0) {
            //console.log("Wrong Letter");
            UICtrl.typeWrongLetter(letter);
            GameCtrl.subtractionTries();
            //console.log("Tries left: " + GameCtrl.getTries());
            if (GameCtrl.getTries() === 0) {
              UICtrl.showMessage("Sorry, but u a looser");
              return;
            }
          }
          for (let [letter, pos] of letterPosition) {
            /// Проверяем, правильная ли буква
            UICtrl.typeLetter(letter, pos);
            GameCtrl.subtractionlettersLeft();
            if (GameCtrl.getLettersLeft() === 0) {
              UICtrl.showMessage("CONGRATS!!!");
            }
          }

          return true;
        } else {
          //console.log("This letter was typed before");
        }
      } else {
        //console.log("NOT CYRILLIC!!!11");
        return false;
      }
    } else if (e.type === "submit") {
      if (regExp.test(e.target.firstElementChild.value)) {
        if (e.target.firstElementChild.value.length > 15) {
          alert("Too long");
          return false;
        }
        //console.log("cyrillic");
        return true;
      }
    }
  }
  function typeLetter(e) {
    if (GameCtrl.getTries() === 0 || GameCtrl.getLettersLeft() === 0) {
      return;
    }
    console.log(e.target);
    const event = new Event("keydown");
    if (e.target.localName === "div") {
      console.log(e.target.firstElementChild.textContent);
      event.key = e.target.firstElementChild.textContent;
      checkKey(event);
    } else if (e.target.localName === "span") {
      console.log(e.target.textContent);
      event.key = e.target.textContent;
      checkKey(event);
    }
  }

  return {
    init() {
      initEventListeners(UICtrl);
      const length = GameCtrl.initGame();
      //console.log(length);
      UICtrl.initGame(length);
    },
  };
})(GameCtrl, UICtrl);
appInit.init();
