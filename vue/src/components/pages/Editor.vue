<template>
  <div class="editor-page">
    <div class="editor-page__left">
      <EditorGrid />
    </div>
    <div class="editor-page__right">
      <GridDimention />
      <DropdownSelect />
      <GridValidation />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditorGrid from "../parts/EditorGrid.vue";
import DropdownSelect from "../parts/DropdownSelect";
import GridDimention from "../parts/GridDimention";
import GridValidation from "../parts/GridValidation.vue";

export default {
  name: "EditorPage",
  components: {
    EditorGrid,
    DropdownSelect,
    GridDimention,
    GridValidation,
  },
  beforeMount() {
    this.loadLevel({levelNumber: "editor"});
  },
  methods: {
    ...mapActions("game", ["loadLevel"]),
  },
};
</script>

<style scoped lang="less">
.editor-page {
  display: flex;
  height: 100vh;

  &__left {
    flex: 3;
    display: flex;
    border-right: 1px solid #ccc;
    padding: 16px;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  &__right {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
