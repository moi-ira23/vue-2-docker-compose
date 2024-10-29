import cardStore from "./cards";

export default {
  namespaced: true,
  state: {
    startingDeck: [],
    deck: [],
    hand: [0, 1, 2, 3, ],
    drawPile: [],
    discardPile: [],
  },
  getters: {
    getDeck: (state) => state.deck.map((index) => cardStore.state.cards[index]),
    getHand: (state) => state.hand.map((index) => cardStore.state.cards[index]),
    getDrawPile: (state) => state.drawPile.map((index) => cardStore.state.cards[index]),
    getDiscardPile: (state) => state.discardPile.map((index) => cardStore.state.cards[index]),
  },
};
