import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteNames } from './routes'
import AddItemPage from "../components/pages/AddItem.vue"
import CatalogPage from '@/components/pages/Catalog.vue'
import ItemPage from '@/components/pages/Item.vue'
import CartPage from '../components/pages/Cart.vue'
import FavoritesPage from '../components/pages/Favorites.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: RouteNames.CATALOG,
    component: CatalogPage
  },
  {
    path: '/item/:itemId',  
    name: RouteNames.ITEM,
    component: ItemPage
  },
  {
    path: "/add-item",
    name: RouteNames.ADD_ITEM,
    component: AddItemPage,
  },
  {
    path: '/cart',
    name: RouteNames.CART,
    component: CartPage
  },
  {
    path: '/favorites',
    name: RouteNames.FAVORITES,
    component: FavoritesPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
