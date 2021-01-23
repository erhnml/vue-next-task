import { createRouter, createWebHistory } from "vue-router";
import List from "../pages/List.vue";
import Detail from "../pages/Detail.vue";

const routes = [
  { path: "/detail/:id", component: Detail },
  { path: "/", component: List },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
