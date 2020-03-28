<template>
  <div :class="[`todo__item`, info.done ? `todo__item--done` : ``]">
    <button
      type="button"
      :aria-checked="info.done | stringize"
      class="todo__state"
      @click="toggleState()"
    >
      <font-awesome-icon
        :icon="[
          info.done ? `fas` : `far`,
          info.done ? `check-square` : `square`
        ]"
        aria-hidden="true"
      />
      <span class="sr-only">{{ info.done | state }}</span>
    </button>
    <span># {{ info.id }}</span>
    <span class="todo__body">
      <span class="todo__title">
        {{ info.title }}
      </span>
      <span v-if="references.length" class="todo__reference-wrapper">
        <span
          v-for="reference in references"
          :key="reference.id"
          :class="{ 'todo__reference--done': reference.done }"
        >
          {{ `@${reference.id}` }}
        </span>
      </span>
    </span>
    <button
      type="button"
      class="todo__edit"
      aria-label="수정"
      :ref="`btn-modify`"
      @click="modifyTodo()"
    >
      <font-awesome-icon :icon="['fas', 'pencil-alt']" />
    </button>
    <button
      type="button"
      class="todo__delete"
      aria-label="삭제"
      @click="deleteTodo()"
    >
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>
    <div class="todo__dates">
      <span>작성일: {{ info.registed | timeToString }}</span>
      <span>최종수정일: {{ info.updated | timeToString }}</span>
    </div>
  </div>
</template>

<script>
import { library as fontAwesomeLibrary } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { mapGetters } from "vuex";
import flatMap from "lodash/flatMap";
import filter from "lodash/filter";
import { patchTodo } from "../api";
import moment from "moment";

fontAwesomeLibrary.add(faSquare, faCheckSquare, faPencilAlt, faTimes);

export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["todos"]),
    references() {
      const { references } = this.info;

      return flatMap(references, reference =>
        filter(this.todos, todo => todo.id == reference)
      );
    },
    dependencies() {
      const { id } = this.info;
      return filter(this.todos, todo => {
        return todo.references.includes(id);
      });
    }
  },
  filters: {
    stringize(value) {
      return JSON.stringify(value);
    },
    state(value) {
      return value ? `완료` : `미완료`;
    },
    timeToString(value) {
      return moment(value).format(`YY.MM.DD HH:mm`);
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    toggleState() {
      const notCompleted = this.references.filter(reference => !reference.done);
      const complatedDependency = this.dependencies.filter(
        dependency => dependency.done
      );

      if (notCompleted.length) {
        alert(`참조된 할 일이 완료되어야 완료 처리가 가능합니다.`);
        return;
      }

      if (complatedDependency.length) {
        alert(`상위 항목이 완료되어 변경이 불가능합니다.`);
        return;
      }

      patchTodo(this.info.id, { done: !this.info.done })
        .then(() => {
          this.info.done = !this.info.done;
        })
        .catch(err => {
          alert(
            `오류가 발생하여 처리되지 않았습니다.\n잠시 후 다시 시도해주세요.`
          );
          console.log(err);
        });
    },
    deleteTodo() {
      if (this.dependencies.length) {
        alert(`상위 항목이 있으므로 삭제가 불가합니다`);
        return;
      }
      this.$emit(`deleteTodo`, this.info);
    },
    modifyTodo() {
      this.$emit(`modifyTodo`, this.info);
    }
  }
};
</script>

<style lang="scss" scoped>
.todo {
  $done-item: ".todo__item--done";

  &__item {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dashed gray;
    padding: 0.75em 0;
    font-size: 1.25em;

    &:first-child {
      border-top: 0;
    }
  }
  &__state,
  &__edit,
  &__delete {
    flex: 0 0 auto;
    border: 0;
    padding: 0 0.5em;
    background-color: transparent;
    font: inherit;
    cursor: pointer;
  }
  &__state {
    > .sr-only {
      overflow: hidden;
      display: inline-block;
      width: 1px;
      height: 1px;
      clip-path: (1px, 1px, 1px);
    }

    #{$done-item} & {
      color: green;
    }
  }
  &__body {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
  }
  &__reference {
    &-wrapper {
      font-size: 0.85em;
    }
    &--done {
      text-decoration: line-through;
    }
  }
  &__title {
    box-sizing: border-box;
    width: 90%;
    text-align: center;
    #{$done-item} & {
      text-decoration: line-through;
    }
  }
  &__dates {
    flex: 1 0 100%;
    margin-top: 1em;
    text-align: right;
    font-size: 0.75em;
    color: gray;

    > span:first-child {
      margin-right: 1em;
    }
  }
}
</style>
