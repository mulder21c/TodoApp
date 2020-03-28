import Vue from "vue";
import Vuex from "vuex";
import {
  fetchList,
  pushTodo,
  deleteTodo,
  patchTodo,
  searchTodo
} from "../api/index";
import findIndex from "lodash/findIndex";

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
    },
    PATCH_ITEM(state, item) {
      const idx = findIndex(state.todoList, todo => todo.id == item.id);
      state.todoList.splice(idx, 1, item);
    },
    SEARCH_TODOS(state, list) {
      state.todoList = list;
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
    PATCH_ITEM({ commit }, payload) {
      const { id } = payload;
      return patchTodo(id, payload).then(response =>
        commit("PATCH_ITEM", response.data)
      );
    },
    DELETE_ITEM({ commit }, item) {
      return deleteTodo(item.id).then(() => commit("DELETE_ITEM", item));
    },
    SEARCH_TODOS({ commit }, options) {
      return searchTodo(options).then(response =>
        commit("SEARCH_TODOS", response.data)
      );
    }
  },
  getters: {
    todos(state) {
      return state.todoList;
    }
  }
});
