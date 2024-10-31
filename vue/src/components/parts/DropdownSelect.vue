<template>
  <div
    class="select"
    :tabindex="tabindex"
    :class="{
      'select--disabled': !isActive,
    }"
    @focus="() => selectFocused()"
    @blur="() => selectFocusOut()"
  >
    <select v-model="selectedCellType" style="display: none">
      <option v-for="type in cellTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <div
      class="select__toggle"
      :class="toggleClass"
      @mouseover="() => setTextHoverIfNotOpen()"
      @mouseleave="() => unHoverText()"
      @click="() => selectToggleClick()"
    >
      {{ displayText }}
    </div>
    <transition name="select__slide-fade">
      <div class="select__dropdown" v-show="isOpen">
        <ul class="select__options">
          <div class="select__no-data" v-if="!cellTypes.length">
            {{ noDataMessage }}
          </div>
          <li
            class="select__option"
            v-for="(type, index) in cellTypes"
            :key="index"
            :class="{
              'select__option--selected': type === selectedCellType,
              'select__option--highlighted': isOptionHighlighted(type),
            }"
            @mouseover="() => setHighlightedOption(type)"
            @click="() => onOptionClick(type)"
          >
            {{ type }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DropdownSelect",
  data() {
    return {
      selectedCellType: null,
      highlightedOption: null,
      isOpen: false,
      isTextHover: false,
      isFocused: false,
    };
  },
  props:{
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters("game", ["getGrid", "selectedGrid", "cellTypes"]),
    isActive() {
      return this.selectedCount > 0;
    },
    selectedCount() {
      return this.selectedGrid.flat().filter((cell) => cell).length;
    },
    displayText() {
      if (!this.isActive) return "Выберите ячейки";
      const selectedValues = this.selectedGrid
        .flat()
        .map((cell, index) => {
          if (cell) {
            const rowIndex = Math.floor(index / this.selectedGrid[0].length);
            const colIndex = index % this.selectedGrid[0].length;
            return this.getGrid[rowIndex][colIndex];
          }
          return null;
        })
        .filter(Boolean);

      const allSame = selectedValues.every((val) => val === selectedValues[0]);
      return selectedValues.length > 0 && allSame
        ? selectedValues[0]
        : "Разные";
    },
    toggleClass() {
      return {
        "select__toggle--focused": this.isFocused,
        "select__toggle--opened": this.isOpen,
        "select__toggle--highlighted": this.isTextHover,
      };
    },
  },
  methods: {
    ...mapActions("game", ["toggleSelectedCell", "updateCell"]),
    updateSelectedCells() {
      this.selectedGrid.forEach((row, rowIndex) => {
        row.forEach((isSelected, colIndex) => {
          if (isSelected) {
            this.updateCell({
              row: rowIndex,
              col: colIndex,
              cellType: this.selectedCellType,
            });
          }
        });
      });
      this.resetSelection();
      this.selectedCellType = null;
    },
    resetSelection() {
      this.selectedGrid.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
          if (this.selectedGrid[rowIndex][colIndex]) {
            this.toggleSelectedCell({ row: rowIndex, col: colIndex });
          }
        });
      });
    },
    isOptionHighlighted(type) {
      return type === this.highlightedOption;
    },
    setHighlightedOption(type) {
      this.highlightedOption = type;
    },
    selectToggleClick() {
      this.isOpen = !this.isOpen;
    },
    onOptionClick(type) {
      this.selectedCellType = type;
      this.isOpen = false;
      this.updateSelectedCells();
    },
    selectFocused() {
      this.isFocused = true;
    },
    selectFocusOut() {
      this.isOpen = false;
      this.isFocused = false;
    },
    setTextHoverIfNotOpen() {
      if (!this.isOpen) {
        this.isTextHover = true;
      }
    },
    unHoverText() {
      this.isTextHover = false;
    },
  },
};
</script>

<style scoped lang="less">
.select {
  position: relative;
  width: 100%;
  outline: none;

  &--disabled {
    pointer-events: none;
    filter: brightness(0.7);
  }

  &__toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-size: 14px;
    line-height: 1.4;
    background-color: white;
    border: 1px solid grey;
    border-radius: 2px;
    cursor: pointer;
    user-select: text;

    &--highlighted {
      border-color: #a5a5a5;
    }

    &--focused {
      border-color: #5089f3;
      outline: none;
    }

    &--disabled {
      pointer-events: none;
    }

    &::after {
      width: 0.75rem;
      height: 0.75rem;
      margin-left: 1rem;
      background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="%23ccc" height="100" width="100"%3E%3Cpath d="M97.625 25.3l-4.813-4.89c-1.668-1.606-3.616-2.41-5.84-2.41-2.27 0-4.194.804-5.777 2.41L50 52.087 18.806 20.412C17.223 18.805 15.298 18 13.03 18c-2.225 0-4.172.804-5.84 2.41l-4.75 4.89C.813 26.95 0 28.927 0 31.23c0 2.346.814 4.301 2.439 5.865l41.784 42.428C45.764 81.174 47.689 82 50 82c2.268 0 4.215-.826 5.84-2.476l41.784-42.428c1.584-1.608 2.376-3.563 2.376-5.865 0-2.26-.792-4.236-2.375-5.932z"/%3E%3C/svg%3E');
      background-size: cover;
      content: "";
      transition: transform 0.3s ease-in-out;
    }

    &--opened&::after {
      transform: rotate(-180deg);
      transition: transform 0.3s ease-in-out;
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 2;
    display: block;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 10%;
      z-index: 2;
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 13px solid grey;
    }

    &::after {
      content: "";
      position: absolute;
      top: 4px;
      left: 10%;
      z-index: 2;
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 13px solid white;
    }
  }

  &__no-data {
    padding: 0.375rem 0.75rem;
  }

  &__options {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    max-height: 10rem;
    overflow-y: auto;
    background-color: white;
    border: 1px solid grey;
    border-radius: 2px;
    box-shadow: 0px 0px 10px #dbd6d6;
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    list-style: none;
  }

  &__option {
    padding: 0.375rem 0.75rem;

    &--selected {
      font-weight: bolder;
      color: #5089f3;
    }

    &--highlighted {
      background-color: #f5f5f5;
      cursor: pointer;
      transition: 0.1s background-color ease-in-out;
    }
  }

  /*Animations*/

  &__slide-fade {
    &-enter-active,
    &-leave-active {
      transition: all 0.2s ease-in-out;
    }

    &-enter,
    &-leave-to {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
}
</style>
