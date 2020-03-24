<template>
  <div class="todo__list" role="list">
    <todoItem
      v-for="todo in todos"
      :key="todo.id"
      :info="todo"
      role="listitem"
    />
  </div>
</template>

<script>
import todoItem from "./todoItem";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["todos"])
  },
  components: {
    todoItem
  }
};
</script>
