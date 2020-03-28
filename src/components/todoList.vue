<template>
  <div class="todo__list" role="list">
    <todoItem
      v-for="todo in todos"
      :key="todo.id"
      :info="todo"
      role="listitem"
      @deleteTodo="deleteTodo"
      @modifyTodo="modifyTodo"
    />
  </div>
</template>

<script>
import todoItem from "./todoItem";

export default {
  props: {
    todos: {
      type: Array,
      require: true
    }
  },
  components: {
    todoItem
  },
  methods: {
    deleteTodo(payload) {
      this.$emit(`deleteTodo`, payload);
    },
    modifyTodo(payload) {
      this.$emit(`modifyTodo`, payload);
    }
  }
};
</script>
