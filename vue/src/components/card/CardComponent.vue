<template>
  <div class="card"
    @mouseenter="() => onMouseOver(true)"
    @mouseleave="() => onMouseOver(false)"
    @click="() => onCardClick()"
  >
    <div class="card__content center-horizontal">
      <div class="card__cost center-horizontal center-vertical">
        <p>{{ (() => card.cost)() }}</p>
      </div>
      <div class="card__image center-horizontal">
        <img class="card__image-img"
          src='../../assets/cards/background.png'
        />
        <img v-if="(() => card.image)()"
          class="card__image-img"
          :src="(() => card.image)()"
        />
      </div>
      <div class="card__info">
        <div class="card__title">
          <p>{{ (() => card.title)() }}</p>
        </div>
        <div class="card__description">
          <p>{{ (() => cardDescription)() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardEffect from '../common/cardEffect';

export default {
  props: {
    card: Object,
  },
  data() {
    return {
      cardDescription: "",
    };
  },
  mounted() {
    this.generateDescription();
    console.log(this.card);
  },
  methods: {
    onCardClick() {
      this.$emit('onCardClick', this.card);
    },

    onMouseOver(isHovered) {
      this.$emit('onMouseOver', isHovered);
    },

		generateDescription() {
			this.cardDescription = "";

			this.card.effects.forEach(effect => {
				this.cardDescription += this.returnDescriptionString(effect) + '\n';
			});
		},

		returnDescriptionString(effect) {
			switch (effect.type) {
				case cardEffect.ATTACK: {
					if (effect.values.length == 1)
						return `Attack for ${effect.values[0]}`
					else
						return `Attack for ${effect.values[0]} ${effect.values[1]} times`
				}
				case cardEffect.DEFEND: {
					return `Defend for ${effect.values[0]}`
				}
				case cardEffect.DRAW: {
					return `Draw ${effect.values[0]} cards`
				}
				case cardEffect.SHUFFLE: {
					return `Shuffle the deck`
				}
				case cardEffect.DISCARDRANDOM: {
					if (effect.values[0] == 1)
						return `Discard random card`
					else
						return `Discard ${effect.values[0]} random cards`
				}
				case cardEffect.DISCARDHAND: {
					return `Discard your hand`
				}
				case cardEffect.EXHAUSTSELF: {
					return `Exhaust this card`
				}
			}
			return "Invalid Effect";
		},
  },
};
</script>

<style scoped lang="less">
.card {
	@cardHeight: 320px;
	@cardWidth: 220px;
	@imageHeight: 120px;
	@imageWidth: 200px;

  height: @cardHeight;
  width: @cardWidth;
  transform-origin: center;
  cursor: pointer;

	&__content {
		display: flex;
		flex-direction: column;
		overflow: hidden;

		height: @cardHeight;
		width: @cardWidth;

		background-color: rgb(121, 126, 133);
		border: 2px solid #000;
		border-radius: 15px;
	}

	&__cost {
		height: 25px;
		width: 25px;

		position: absolute;
		margin-top: -310px;
		margin-left: -5px;
		z-index: 10;

		background-color: #e2d87b;
		border: 2px solid #a09748;
		border-radius: 6px;

		font: 20px bold;
		text-wrap: nowrap;
	}

	&__image {
    height: @imageHeight;
    width: @imageWidth;

    position: relative;
    margin-left: calc((@cardWidth - @imageWidth) / 2);
    margin-top: 10px;
    border-radius: 15px;
    
		&-img {
      height: 100%;
      width: 100%;
      border-radius: 15px;
      position: absolute; 
      top: 0;
      left: 0;
		}
	}

	&__info {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;

    width: @imageWidth;
    margin-left: calc((@cardWidth - @imageWidth) / 2);
    margin-top: 10px;
  }

  &__title {
    height: 22px;
    background-color: rgb(95, 95, 95);
    border-radius: 15px;

    font-size: 18px;
    color: rgb(193, 194, 196);
  }

  &__description {
    flex-basis: 100%;

    margin-top: 5px;
    background-color: rgb(59, 59, 59);
    border: 2px solid rgb(26, 25, 25);
    border-radius: 15px;
    padding: 5px;


    font-size: 14px;
    color: rgb(234, 236, 236);
    white-space: pre-line;
    overflow-wrap: break-word;
  }
}
</style>