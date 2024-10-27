import cardEffect from "@/components/common/cardEffect";

export default {
  namespaced: true,
  state: {
    cards: [
      {
        title: "Attack",
        image: require("@/assets/cards/Archer_Charged_Shot.png"),
        cost: 1,
        rarity: 1,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [6],
          },
        ],
      },
      {
        title: "Defend",
        image: require("@/assets/cards/Mage_Explode.png"),
        cost: 0,
        rarity: 1,
        effects: [
          {
            type: cardEffect.DEFEND,
            values: [6],
          },
        ],
      },
      {
        title: "Riposte",
        image: require("@/assets/cards/Archer_Back_Up.png"),
        cost: 4,
        rarity: 1,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [4],
          },
          {
            type: cardEffect.DEFEND,
            values: [4],
          },
        ],
      },
      {
        title: "Fury Swipes",
        image: require("@/assets/cards/Archer_Rapid_Fire.png"),
        cost: 14,
        rarity: 1,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [1, 4],
          },
        ],
      },
      {
        title: "",
        image: "",
        cost: 0,
        rarity: 0,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [0],
          },
        ],
      },
    ],
  },
  getters: {
    getCards: (state) => state.cards,
    getCardById: (state) => (id) => state.cards.find((card) => card.id == id),
  },
};
