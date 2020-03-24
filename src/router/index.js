import Vue from "vue";
import VueRouter from "vue-router";
import todoApp from "../views/todoApp";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    name: `index`,
    component: todoApp,
    beforeEnter(to, from, next) {
      store
        .dispatch("FETCH_LIST")
        .then(() => {
          next();
        })
        .catch(err => {
          new Error("Failed to fetch todo list", err);
        });
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
