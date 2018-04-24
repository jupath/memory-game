'use strict';

(function() {

  let deckSize;
  let numberOfClicks = 0;

  const cards = ['angular', 'd3', 'jenkins', 'postcss', 'react', 'redux', 'sass', 'supercharge', 'ts', 'webpack'];

  const selectDeckSize = document.getElementById('select-deck-size');
  const startNewGame = document.getElementById('start-new-game');
  const board = document.getElementById('board');
  let boardItems;

  /*
  * Add deck sizes to select
  */
  function selectDeckSizeOptions(min, max) {
    deckSize = max;

    let numberOfDeckSizes = [];

    for (let i = 20; i >= 6; i-=2) {
      numberOfDeckSizes.push(i);
    }

    const deckSizesOptions = numberOfDeckSizes.map(cur => {
      return `
        <option value="${cur}">${cur}</option>
      `;
    }).join('');

    selectDeckSize.innerHTML = deckSizesOptions;
  }

  selectDeckSizeOptions(6, 20);

  selectDeckSize.addEventListener('change', function(event) {
    deckSize = event.target.value;
  });

  /*
  * Populate cards
  */
  function populateCards(cards) {
    const cardsHtml = cards.map(card => {
      return `
        <div class="col p-4 m-2 board__item hide">
          <img src="assets/${card}.png" />
        </div>
      `;
    }).join('');

    board.innerHTML = cardsHtml;

    boardItems = document.querySelectorAll('.board__item');
  }

  function shuffelCards() {

    const cardsToShow = cards.slice(0, deckSize / 2);

    const duplicateCards = [
      ...cardsToShow,
      ...cardsToShow,
    ];

    for (let i = duplicateCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicateCards[i], duplicateCards[j]] = [duplicateCards[j], duplicateCards[i]];
    }

    populateCards(duplicateCards);
  }

  /*
  * Start new game event listener
  */
  startNewGame.addEventListener('click', function() {
    shuffelCards();
  });

  /*
  * Board click event listener
  */
  board.addEventListener('click', function(event) {
    const target = event.target;

    if (numberOfClicks === 2) {
      numberOfClicks = 0;

      for (let i = 0; i < boardItems.length; ++i) {
        if(!boardItems[i].classList.contains('hide')) {
          boardItems[i].classList.add('hide');
        }
      }
      target.classList.remove('hide');
      numberOfClicks++;
    } else {
      numberOfClicks++;
      target.classList.remove('hide');
    }

  });

}());