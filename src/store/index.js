import Vue from "vue";
import Vuex from "vuex";
import { fetchList } from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
    SET_LIST(state, list) {
      state.todoList = list;
    }
  },
  actions: {
    FETCH_LIST({ commit }) {
      return fetchList().then(response => commit("SET_LIST", response.data));
    }
  },
  getters: {
    todos(state) {
      return state.todoList;
    }
  }
});
