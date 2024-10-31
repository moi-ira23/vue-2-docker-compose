<template>
  <div class="game-cell">
    <div class="game-cell__body" :class="'game-cell__body--' + getCellTypeName">
      <div
        v-if="getCellTypeName === 'pot' || getCellTypeName === 'flower-pot'"
        :class="['game-cell__body--' + getCellTypeName + '-overlay']"
      ></div>
      <div
        v-if="getCellTypeName === 'flower-field' || getCellTypeName === 'flower-pot'"
        class="game-cell__body--flower"
      >
        <div class="game-cell__body--flower-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CellTypeMap from '../../GameEngine/CellTypes'

export default {
  props: {
    cellType: Number,
  },
  computed: {
    getCellTypeName () {
      return CellTypeMap[this.cellType];
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/styles/variables.less";

.game-cell {
  margin: 3px;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  position: relative;
  &__body {
    width: 100%;
    height: 100%;
    border-radius: 10%;
    position: relative;
    &--air {
      background-color: var(--air-cell-color);
    }

    &--wall {
      background-color: var(--wall-cell-color);
      background-image: url(../../assets/images/wall-cell-image.png);
      background-size: cover;
      background-position: center;
    }

    &--field {
      background-color: var(--field-cell-color);
    }

    &--shadow {
      background-color: var(--shadow-cell-color);
      background-image: url(../../assets/images/shadow-cell-image.png);
      background-size: cover;
      background-position: center;
    }

    &--sun {
      background-color: var(--sun-cell-color);
      background-image: url(../../assets/images/sun-cell-image.png);
      background-size: cover;
      background-position: center;
    }

    &--water {
      background-color: var(--water-cell-color);
      background-image: url(../../assets/images/water-cell-image.png);
      background-size: cover;
      background-position: center;
    }

    &--pot {
      background-color: var(--pot-cell-color);

      &-overlay {
        position: absolute;
        border-radius: 10%;
        width: 60px;
        height: 60px;
        top: 10px;
        left: 10px;
        background-color: var(--pot-inner-cell-color);
        z-index: 1;
      }
    }

    &--flower-field {
      background-color: var(--field-cell-color);
    }

    &--flower-pot {
      background-color: var(--pot-cell-color);

      &-overlay {
        position: absolute;
        border-radius: 10%;
        width: 60px;
        height: 60px;
        top: 10px;
        left: 10px;
        background-color: var(--pot-inner-cell-color);
      }
    }

    &--flower {
      background-color: var(--flower-cell-color);
      border-radius: 10%;
      width: 50px;
      height: 50px;
      top: 15px;
      left: 15px;
      position: absolute;
      z-index: 1;

      &-overlay {
        position: absolute;
        background-image: url(../../assets/images/flower-cell-image.png);
        background-size: cover;
        background-position: center;
        width: 50px;
        height: 50px;
        z-index: 2;
        animation: rotateAnimation 3s infinite alternate;
      }
    }

    &--brown {
      background-color: rgb(53, 14, 14);
    }
  }
}

@keyframes rotateAnimation {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(15deg);
  }
}

</style>
