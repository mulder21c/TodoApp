<template>
  <div class="todo__form">
    <input type="text" name="title" id="toto-title" class="todo__textfield" />
    <button type="button" class="todo__button todo__button--search">
      Search
    </button>
    <button type="submit" class="todo__button todo__button--add">
      Add
    </button>
  </div>
</template>

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
    &--add {
      background-color: darkslateblue;
    }
  }
}
</style>
