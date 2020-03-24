<template>
  <div :class="[`todo__item`, info.done ? `todo__item--done` : ``]">
    <button
      type="button"
      :aria-checked="info.done | stringize"
      class="todo__state"
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
    <span class="todo__body">
      <span class="todo__title">
        {{ info.title }}
      </span>
      <span v-if="info.references.length" class="todo__reference-wrapper">
        <span
          v-for="reference in info.references"
          :key="reference.id"
          :class="{ 'todo__reference--done': reference.done }"
        >
          {{ `@${reference.id}` }}
        </span>
      </span>
    </span>
    <button type="button" class="todo__edit" aria-label="수정">
      <font-awesome-icon :icon="['fas', 'pencil-alt']" />
    </button>
    <button type="button" class="todo__delete" aria-label="삭제">
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>
  </div>
</template>

<script>
import { library as fontAwesomeLibrary } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

fontAwesomeLibrary.add(faSquare, faCheckSquare, faPencilAlt, faTimes);

export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  filters: {
    stringize(value) {
      return JSON.stringify(value);
    },
    state(value) {
      return value ? `완료` : `미완료`;
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
.todo {
  $done-item: ".todo__item--done";

  &__item {
    display: flex;
    flex-flow: row nowrap;
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
  }
}
</style>
