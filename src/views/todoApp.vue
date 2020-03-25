<template>
  <div class="todo-wrap">
    <todoForm />
    <todoList :todos="displayToods" />
    <pagenation :info="pageInfo" />
  </div>
</template>

<script>
import todoForm from "../components/todoForm";
import todoList from "../components/todoList";
import pagenation from "../components/pagenation";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      displayToods: [],
      countPerPage: 5,
      currentPage: this.$route.query.page * 1 || 1,
      pageSize: 10
    };
  },
  components: {
    todoForm,
    todoList,
    pagenation
  },
  computed: {
    ...mapGetters(["todos"]),
    pageInfo() {
      return {
        itemCount: this.todos.length,
        currentPage: this.currentPage,
        countPerPage: this.countPerPage,
        pageSize: this.pageSize,
        path: `/`,
        query: {}
      };
    }
  },
  beforeMount() {
    this.updateDisplayTodos();
  },
  methods: {
    updateDisplayTodos() {
      console.log(this.currentPage);
      const startIdx = (this.currentPage - 1) * this.countPerPage;
      const endIdx = startIdx + this.countPerPage;
      this.displayToods = this.todos.slice(startIdx, endIdx);
    }
  },
  watch: {
    $route() {
      this.currentPage = this.$route.query.page;
      this.updateDisplayTodos();
    }
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
