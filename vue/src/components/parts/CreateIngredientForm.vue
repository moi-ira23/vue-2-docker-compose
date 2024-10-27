<template>
    <div class="add-ingredient">
      <form class="add-ingredient__form">
        <label class="add-ingredient__label">Name:</label>
        <input class="add-ingredient__input" type="text" v-model="newIngredient.name"><br>
        <label class="add-ingredient__label">Description:</label>
        <input class="add-ingredient__input" type="text" v-model="newIngredient.description"><br>
        <label class="add-ingredient__label">Measure units:</label>
        <input class="add-ingredient__input" type="text" v-model="newIngredient.measure_units"><br>
        <label class="add-ingredient__label">Cover:</label>
        <input class="add-ingredient__input" @change="loadTextFromFile" type="file" accept="image/*"><br><br>
        <button class="add-ingredient__button" type="submit" @click="addIngredient">Добавить Ингредиент</button>
      </form>
    </div>
</template>

<script>

import Vue from "vue";

export default {
  name: 'CreateIngredientForm',
  data() {
    return {
      text: "",
      ingredients: [],
      images: [],
      newIngredient: {
        name: "",
        cover: "",
        description: "",
        measure_units: "",
      }
    }
  },
  mounted() {
    console.log(localStorage.key(0))
    if (localStorage.getItem('ingredients')) {
      try {
        this.ingredients = JSON.parse(localStorage.getItem('ingredients'));
      } catch(e) {
        localStorage.removeItem('ingredients');
      }
    }
  },
  methods: {
    addIngredient() {
      // ensure they actually typed something
      if (!this.newIngredient) {
        return;
      }

      this.ingredients.push(Vue.util.extend({}, this.newIngredient));
      this.saveIngredient();
    },
    removeIngredient(x) {
      this.ingredients.splice(x, 1);
      this.saveIngredient();
    },
    saveIngredient() {
      const parsed = JSON.stringify(this.ingredients);
      localStorage.setItem('ingredients', parsed);
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.newIngredient.cover = e.target.result;
      reader.readAsDataURL(file);
    },
  }
}

</script>

<style lang="less" scoped>

.add-ingredient {
  box-sizing: content-box;
  padding: 24px 32px;

  margin-left: auto;
  margin-right: auto;
  width: 575px;
  height: auto;
  margin-bottom:30px;

  border: 1px solid #D9D9D9;
  border-radius: 8px;

  &__title {
    width: 167.14px;
    height: 19px;
    left: 32px;
    top: 24px;
    margin-bottom:10px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #000000;
  }

  &__input{
    padding: 8px 24px;
    width: 511px;
    height: auto;
    left: 32px;
    top: 55px;
    margin-bottom:15px;

    background: #ECECEC;
    border-radius: 8px;
    border-style: none;
  }

}

</style>
