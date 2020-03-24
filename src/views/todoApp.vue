<template>
  <div class="todo-wrap">
    <todoForm />
    <todoList />
  </div>
</template>

<script>
import todoForm from "../components/todoForm";
import todoList from "../components/todoList";

export default {
  components: {
    todoForm,
    todoList
  }
};
</script>

<style lang="scss" scoped>
.todo {
  &-wrap {
    margin: 0 auto;
    max-width: 600px;
  }
}
</style>
