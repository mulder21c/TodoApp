<template>
  <div class="todo__form">
    <input
      v-model="title"
      type="text"
      name="title"
      id="toto-title"
      class="todo__textfield"
    />
    <button
      v-if="mode != `modify`"
      type="button"
      class="todo__button todo__button--search"
      @click="searchTodo()"
    >
      Search
    </button>
    <button
      v-if="mode == `modify`"
      type="submit"
      class="todo__button todo__button--modify"
      @click="modifyTodo()"
    >
      Modify
    </button>
    <button
      v-if="mode == `add`"
      type="submit"
      class="todo__button todo__button--add"
      @click="addTodo()"
    >
      Add
    </button>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String
    },
    todo: {
      type: Object
    }
  },
  data() {
    return {
      title: ``
    };
  },
  methods: {
    addTodo() {
      this.$emit(`addTodo`, this.title);
      this.title = ``;
    },
    searchTodo() {
      this.$emit(`searchTodo`, this.title);
    },
    modifyTodo() {
      this.$emit(`patchTodo`, { id: this.todo.id, title: this.title });
    }
  },
  watch: {
    todo(item) {
      if (item) {
        this.title = `${item.title}${item.references.reduce(
          (acc, reference) => acc + ` @${reference}`,
          ``
        )}`;
      } else {
        this.title = ``;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.todo {
  &__form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 2em;
    border: 1px solid gray;
    height: 2.5em;
  }
  &__textfield {
    flex: 8 8 80%;
    padding: 0 0.5em;
    border: 0;
    font-size: 1.25em;
  }
  &__button {
    flex: 1 0 5rem;
    border: 0;
    background-color: transparent;
    font: inherit;
    cursor: pointer;
    color: #fff;
    text-shadow: 1px 1px 0.5px gray, -1px 1px 0.5px gray, 1px -1px 0.5px gray,
      -1px -1px 0.5px gray;

    &:hover,
    &:focus {
      font-size: 1.25em;
      font-weight: 700;
    }

    &--search {
      background-color: lightseagreen;
    }
    &--add,
    &--modify {
      background-color: darkslateblue;
    }
  }
}
</style>
