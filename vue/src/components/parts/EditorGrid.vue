<template>
  <div class="editor_grid">
    <div
      class="editor-grid__row"
      v-for="(row, rowIndex) in getGrid"
      :key="rowIndex"
    >
      <EditorCellWrapper
        v-for="(cell, cellIndex) in row"
        :key="`${rowIndex}-${cellIndex}`"
        :isSelected="selectedGrid[rowIndex][cellIndex]"
        @onClick="() => handleCellClick(rowIndex, cellIndex)"
        @onMouseDown="() => handleCellClick(rowIndex, cellIndex)"
        @onMouseEnter="() => handleCellHover(rowIndex, cellIndex)"
        @onMouseUp="() => endSelection()"
      >
        <GameCell :cellType="cell" />
      </EditorCellWrapper>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameCell from "./GameCell.vue";
import EditorCellWrapper from "./EditorCellWrapper.vue";

export default {
  name: "EditorGrid",
  components: {
    GameCell,
    EditorCellWrapper,
  },
  data() {
    return {
      isSelecting: false,
      rememberedSelection: false, 
    };
  },
  computed: {
    ...mapGetters('game', [
      'getGrid', 'selectedGrid'
    ]),
  },
  methods: {
    ...mapActions('game', [
        'toggleSelectedCell',
    ]),
    handleCellClick(row, col) {
      this.isSelecting = true;
      this.rememberedSelection = !this.selectedGrid[row][col];
      this.toggleSelectedCell({ row, col });
    },
    handleCellHover(row, col) {
      if (this.isSelecting) {
        if (this.selectedGrid[row][col] !== this.rememberedSelection) {
            this.toggleSelectedCell({ row, col });
        }
      }
    },
    endSelection() {
      this.isSelecting = false;
    },
  },
  mounted() {
    window.addEventListener("mouseup", this.endSelection);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.endSelection);
  },
};
</script>

<style scoped lang="less">
.editor-grid {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
  }
}
</style>
