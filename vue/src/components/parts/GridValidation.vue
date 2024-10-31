<template>
    <div class="editor-settings">
      <h3>Валидация карты</h3>
      <div>Цветок: {{ getValidationResults.flower }}</div>
      <div>Стена: {{ getValidationResults.wall }}</div>
      <div>Земля: {{ getValidationResults.ground }}</div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "GridValidation",
    computed: {
      ...mapGetters("game", ["getValidationResults"]),
    },
  };
  </script>
  
  <style scoped lang="less">
  .editor-settings {
    margin: 20px;
    font-size: 16px;
  }
  </style>
  