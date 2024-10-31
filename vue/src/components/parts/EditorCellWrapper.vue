<template>
  <div
    class="wrapper"
    :class="{ 'wrapper--selected': isSelected }"
    @mousedown="() => onMouseDown()"
    @mouseup="() => onMouseUp()"
    @mouseenter="() => onMouseEnter()"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "EditorCellWrapper",
  props: {
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onMouseDown() {
      this.$emit("onMouseDown");
    },
    onMouseUp() {
      this.$emit("onMouseUp");
    },
    onMouseEnter() {
      this.$emit("onMouseEnter");
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  border: 2px solid transparent;
  cursor: pointer;
  &--selected {
    border-color: black;
  }
}
</style>
