import Vue from "vue";
import Vuex from "vuex";
import { fetchList, pushTodo, deleteTodo } from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
    SET_LIST(state, list) {
      state.todoList = list;
    },
    ADD_ITEM(state, item) {
      state.todoList = [item, ...state.todoList];
    },
    DELETE_ITEM(state, item) {
      const idx = state.todoList.indexOf(item);
      state.todoList.splice(idx, 1);
    }
  },
  actions: {
    FETCH_LIST({ commit }) {
      return fetchList().then(response => commit("SET_LIST", response.data));
    },
    ADD_ITEM({ commit }, payload) {
      return pushTodo(payload).then(response =>
        commit("ADD_ITEM", response.data)
      );
    },
    DELETE_ITEM({ commit }, item) {
      return deleteTodo(item.id).then(() => commit("DELETE_ITEM", item));
    }
  },
  getters: {
    todos(state) {
      return state.todoList;
    }
  }
});
