const GameCtrl = (function () {
  let game;
  class Game {
    constructor(word) {
      this.currentWord = word.toLowerCase();
      this.typedLetters = "";
      this.tries = 7;
      this.lettersLeft = word.length;
    }

    getLength() {
      return this.currentWord.length;
    }
  }
  const words = ["белка", "стрелка", "попугай", "стол"];

  function rand(length) {
    return Math.floor(Math.random() * Math.floor(length));
  }

  return {
    initGame(str) {
      if (str) {
        game = new Game(str);
        return game.getLength();
      } else {
        game = new Game(words[rand(words.length)]);
        return game.getLength();
      }
    },

    getWord(word) {
      // либо слово из базы, либо пользовательское слово
      if (word) {
        return word;
      } else {
        return words[rand(words.length)];
      }
    },

    getLetterPosition(letter) {
      const word = game.currentWord;
      game.typedLetters += letter;
      let x = 0;
      let arr = [];
      do {
        //console.log(x);
        x = word.indexOf(letter, x);
        if (x === -1) break;
        arr.push([word[x], x]);
        ++x;
        // console.log(x);
        // console.log(arr);
      } while (true);
      return arr;
    },

    isLetterTypedBefore(letter) {
      return game.typedLetters.includes(letter);
    },

    subtractionTries() {
      --game.tries;
    },

    getTries() {
      return game.tries;
    },

    subtractionlettersLeft() {
      --game.lettersLeft;
    },

    getLettersLeft() {
      return game.lettersLeft;
    },

    // addWord(word) {
    //   words.push(word);
    // },
  };
})();

export default GameCtrl;
