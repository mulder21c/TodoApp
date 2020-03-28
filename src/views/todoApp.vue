<template>
  <div class="todo-wrap">
    <todoForm
      :mode="formMode"
      :todo="modifyObject"
      @addTodo="handleAddTodo"
      @patchTodo="handlePatchTodo"
      @searchTodo="handleSearchTodo"
    />
    <todoList
      :todos="displayToods"
      @modifyTodo="handleModifyTodo"
      @deleteTodo="handleDeleteTodo"
    />
    <pagenation :info="pageInfo" />
  </div>
</template>

<script>
import todoForm from "../components/todoForm";
import todoList from "../components/todoList";
import pagenation from "../components/pagenation";
import { mapGetters, mapActions } from "vuex";
import reject from "lodash/reject";
import moment from "moment-timezone";
moment.tz.setDefault(`Asia-Soule`);

export default {
  data() {
    return {
      displayToods: [],
      countPerPage: 5,
      currentPage: this.$route.query.page * 1 || 1,
      pageSize: 10,
      formMode: `add`,
      modifyObject: {}
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
    ...mapActions(["ADD_ITEM", "DELETE_ITEM", "PATCH_ITEM", "SEARCH_TODOS"]),
    updateDisplayTodos() {
      const startIdx = (this.currentPage - 1) * this.countPerPage;
      const endIdx = startIdx + this.countPerPage;
      this.displayToods = this.todos.slice(startIdx, endIdx);
    },
    resolveTodoBody(str) {
      const references = [];
      let missingReference = [];
      const referencePattern = /(?:\s@)(\d+)(?=\s|$)/g;
      const matches = str.matchAll(referencePattern);
      const title = str.replace(referencePattern, ``).trim();
      for (let match of matches) {
        const reference = this.todos.filter(todo => todo.id == match[1]);
        if (reference.length) references.push(match[1] * 1);
        else missingReference.push(match[1]);
      }

      if (!title.length) {
        alert(`할 일 이름을 작성해주세요`);
        return;
      }

      if (missingReference.length) {
        alert(`@${missingReference.join(`,`)}은 없는 할 일 목록입니다.`);
        return;
      }

      return {
        title,
        references: [...new Set(references)]
      };
    },
    handleAddTodo(payload) {
      const obj = this.resolveTodoBody(payload);
      if (!obj) return;

      const params = {
        title: obj.title,
        references: obj.references,
        done: false,
        registed: new Date().getTime(),
        updated: new Date().getTime()
      };

      this.ADD_ITEM(params).then(() => {
        this.updateDisplayTodos();
      });
    },
    handleDeleteTodo(payload) {
      this.DELETE_ITEM(payload).then(() => {
        this.updateDisplayTodos();
      });
    },
    handleModifyTodo(payload) {
      this.formMode = `modify`;
      this.modifyObject = payload;
    },
    handlePatchTodo(payload) {
      const { id, title } = payload;
      const obj = this.resolveTodoBody(title);
      if (!obj) return;

      const params = {
        id,
        title: obj.title,
        references: reject(obj.references, reference => reference == id),
        updated: new Date().getTime()
      };

      this.PATCH_ITEM(params).then(() => {
        this.updateDisplayTodos();
      });

      this.formMode = `add`;
      this.modifyObject = null;
    },
    handleSearchTodo(payload) {
      const regExp = /(?=(?:.*(reg:\S*))?)(?=(?:.*(is:\S*))?).*/g;
      const dateRegExp = /(^\d{4})(?:[.-]*)(?:(\d{2})?)(?:[.-]*)(?:(\d{2})?)$/g;
      const regResult = regExp.exec(payload);
      const params = {};
      params.title = regResult.reduce((acc, group) => {
        if (!group) return acc;
        const pair = group.split(":");
        params[pair[0]] = pair[1];
        acc = acc.replace(group, ``).trim();
        return acc;
      });

      if (params.reg) {
        params.reg =
          dateRegExp.test(params.reg) &&
          params.reg
            .replace(/[^\d]/g, ``)
            .replace(
              /(^\d{4})(?:(\d{2})?)(?:(\d{2})?)$/g,
              (match, $1, $2, $3) => {
                return `${$1}` + ($2 ? `-${$2}` : ``) + ($3 ? `-${$3}` : ``);
              }
            );
        if (!params.reg || !moment(params.reg).isValid()) {
          alert(`유효한 날짜 형식이 아닙니다.`);
          return;
        }
        switch (params.reg.length) {
          case 4:
            params.registed_gte = moment(
              `${params.reg}-01-01 00:00:00`
            ).valueOf();
            params.registed_lte =
              moment(params.registed_gte)
                .add(`years`, 1)
                .valueOf() - 1;
            break;
          case 7:
            params.registed_gte = moment(`${params.reg}-01 00:00:00`).valueOf();
            params.registed_lte =
              moment(params.registed_gte)
                .add(`months`, 1)
                .valueOf() - 1;
            break;
          case 10:
            params.registed_gte = moment(`${params.reg} 00:00:00`).valueOf();
            params.registed_lte =
              moment(params.registed_gte)
                .add(`days`, 1)
                .valueOf() - 1;
            break;
        }
        delete params.reg;
      }

      this.SEARCH_TODOS(params).then(() => {
        this.currentPage = 1;
        this.updateDisplayTodos();
      });
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
