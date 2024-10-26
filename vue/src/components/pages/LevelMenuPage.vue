<template>
  <div class="level-menu">
    <StartScreen>
      <div class="level-menu__toggle" @click="() => toggleLevels()">
        <CustomButton type="menu">
          {{ showCustomLevels ? 'Показать основные уровни' : 'Показать свои уровни' }}
        </CustomButton>
      </div>
      <div class="level-menu__buttons">
        <RouterLink
          v-for="(button, index) in buttons"
          :key="index"
          :to="button.path"
          class="level-menu__button-link"
        >
          <CustomButton type="level">
            {{ button.text }}
          </CustomButton>
        </RouterLink>
      </div>
    </StartScreen>
  </div>
</template>

<script>
import StartScreen from "../parts/PageBackground.vue";
import CustomButton from "../parts/CustomButton.vue";
import gameStorage from '@/GameEngine/gameStorage';

export default {
  name: "StartMenuView",
  components: {
    StartScreen,
    CustomButton,
  },
  data() {
    return {
      showCustomLevels: false,
    };
  },
  computed: {
    levelsCount() {
      return gameStorage.getNumberOfLevels(false);
    },
    customLevelsCount() {
      return gameStorage.getNumberOfLevels(true);
    },
    buttons() {
      return Array.from({ length: this.showCustomLevels? this.customLevelsCount : this.levelsCount }, (_, index) => ({
        text: `${index + 1}`,
        path: `/${this.showCustomLevels? 'custom-' : ''}level-${index + 1}`,
        type: "level",
      }));
    }
  },
  methods: {
    toggleLevels() {
      this.showCustomLevels = !this.showCustomLevels;
    },
  },
};
</script>

<style lang="less">
@import "../../assets/styles/variables.less";

.level-menu {
  background-color: var(--main-background-color);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__toggle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    z-index: 1;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;
    margin: 40px;
  }

  &__button-link {
    text-decoration: none;
    z-index: 1;
  }
}
</style>
