<template>
  <div class="todo-wrap">
    <todoForm @addTodo="handleAddTodo" />
    <todoList :todos="displayToods" />
    <pagenation :info="pageInfo" />
  </div>
</template>

<script>
import todoForm from "../components/todoForm";
import todoList from "../components/todoList";
import pagenation from "../components/pagenation";
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions(["ADD_ITEM"]),
    updateDisplayTodos() {
      const startIdx = (this.currentPage - 1) * this.countPerPage;
      const endIdx = startIdx + this.countPerPage;
      this.displayToods = this.todos.slice(startIdx, endIdx);
    },
    async handleAddTodo(payload) {
      let str = payload;
      const references = [];
      let missingReference = [];
      const referencePattern = /(?:\s@)(\d+)(?=\s|$)/g;
      const matches = str.matchAll(referencePattern);
      for (let match of matches) {
        const reference = this.todos.filter(todo => todo.id == match[1]);
        if (reference.lenght) references.push(match[1] * 1);
        else missingReference.push(match[1]);
      }

      if (missingReference.length) {
        alert(`@${missingReference.join(`,`)}은 없는 할 일 목록입니다.`);
        return;
      }

      const params = {
        title: str.replace(referencePattern, ``),
        references,
        done: false,
        registed: new Date().getTime(),
        updated: new Date().getTime()
      };

      await this.ADD_ITEM(params);
      this.updateDisplayTodos();
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
