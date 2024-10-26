import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import GamePage from "../components/pages/Game.vue";
import EditorPage from "../components/pages/Editor.vue";
import { RouteNames } from "./routes";
import StartMenuPage from '@/components/pages/StartMenuPage.vue'
import LevelMenuPage from '@/components/pages/LevelMenuPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: HomePage,
  },
  {
    path: "/level-:level_number",
    name: RouteNames.GAME,
    component: GamePage,
    props: (route: Route) => ({
      levelNumber: Number(route.params.level_number),
    }),
  },
  {
    path: "/custom-level-:level_number",
    name: RouteNames.CUSTOM_GAME,
    component: GamePage,
    props: (route: Route) => ({
      levelNumber: Number(route.params.level_number),
      isCustom: true
    }),
  },
  {
    path: "/editor",
    name: RouteNames.EDITOR,
    component: EditorPage,
  },
  {
    path: "/menu",
    name: RouteNames.START_MENU,
    component: StartMenuPage,
  },
  {
    path: "/levels",
    name: RouteNames.LEVEL_MENU,
    component: LevelMenuPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
