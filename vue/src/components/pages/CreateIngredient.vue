<template>
  <div class="create-ingredient">
    <CreateIngredientForm/>
    <h2>Ингредиенты</h2>
    <div class="create-ingredient__container">
      <IngredientComponent
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :ingredient="ingredient" />
    </div>
  </div>
</template>

<script>

import CreateIngredientForm from "@/components/parts/CreateIngredientForm.vue";
import IngredientComponent from "@/components/parts/IngredientComponent.vue";
import { mapGetters } from 'vuex';

export default {
  components: {IngredientComponent, CreateIngredientForm},
  computed: {
    ...mapGetters('ingredients', {
      ingredients: 'getIngredients'
    })
  }
}


</script>

<style lang="less" scoped>
.create-ingredient {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__container {
    width: 900px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    flex-direction: row;
    margin-left: 180px;
  }
}
</style>
