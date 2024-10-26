<template>
  <div class="deck__wrapper center-horizontal">
    <div class="deck center-horizontal center-vertical"
      :style="(() => ({'--card-spacing': `${getXSpacing}px`}))()"
    >
      <CardComponent 
        v-for="(card, index) in getHand" 
        :key="(() => card.id)()"
        :card="(() => card)()"
        :style="(() => applyTransform(index))()"
        @onMouseOver="(isHovered) => handleMouseOver(isHovered, index)"
        @onCardClick="() => handleCardClick()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardComponent from '../card/CardComponent.vue';

export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      hoveredIndex: null,
    };
  },
  computed: {
    ...mapGetters("deck", ["getHand"]),
    
    handLength() {
      return this.getHand.length;
    },
    
    getXSpacing() {
      return this.handLength * -11;
    },

    getScaling() {
      return 0.9;
    },
  },
  methods: {
    handleCardClick(card) {
      console.log("Handling Card Click", card);
    },

    handleMouseOver(isHovered, index) {
      this.hoveredIndex = isHovered ? index : null;
    },

    applyTransform(index) {
      const isHovered = this.hoveredIndex == index;
      if (isHovered)
        return {
					transform: `scale(${this.getScaling + 0.05}) rotate(0deg) translateY(-35px)`,
					transition: `transform 0.1s ease-out`,
					zIndex: 100
				}
      else
				return {
					transform: `scale(${this.getScaling}) rotate(${this.getRotation(index)}deg) translateY(${this.getYShift(index)}px)`,
					transition: `transform 0.05s ease-in`,
				}
    },

    getRotation(index) {
      const maxAngle = 20;
      const centerIndex = (this.handLength - 1) / 2;
      const scaleFactor = Math.min(1, this.handLength / 5);
      return maxAngle * ((index - centerIndex) / centerIndex) * scaleFactor;
    },

    getYShift(index) {
      const centerIndex = (this.handLength - 1) / 2;
      const maxDrop = 30;
      const distanceFromCenter = Math.abs(index - centerIndex);
      const scaleFactor = Math.min(1, this.handLength / 9);
      return (maxDrop * (distanceFromCenter / centerIndex) ** 2) * 5 * scaleFactor;
    },
  },
};
</script>

<style scoped lang="less">
.deck {
  height: 290px;
  width: 1100px;
  padding-left: 120px;
  padding-right: 10px;

  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: pink;

  &__wrapper {
    height:fit-content;
    width: fit-content;

    padding-top: 35px;
    overflow: hidden;
  }

  > .card {
      margin-left: var(--card-spacing);
    }

}
</style>