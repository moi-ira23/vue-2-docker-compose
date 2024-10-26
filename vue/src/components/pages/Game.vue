<template>
  <div class="game-page">
    <h2>Level {{ levelNumber }}</h2>
    <GameGrid />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GameGrid from "../parts/GameGrid.vue";

export default {
  name: 'GamePage',
  components: {
    GameGrid,
  },
  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
    isCustom: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  mounted() {
    this.loadLevel({levelNumber: this.levelNumber, isCustom: this.isCustom});
  },
  methods: {
    ...mapActions('game', ['loadLevel'])
  }
};
</script>

<style scoped lang="less">
.game-page {
}
</style>
