<template>
  <nav class="todo__pages">
    <router-link
      :to="{
        path: info.path,
        query: Object.assign({}, info.query, { page })
      }"
      v-for="(page, idx) in range"
      :key="idx"
      :class="[
        `todo__page`,
        page === info.currentPage ? `todo__page--current` : ``
      ]"
    >
      {{ page }}
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    range() {
      const { currentPage, pageSize, itemCount, countPerPage } = this.info;
      const last = Math.ceil(itemCount / countPerPage);
      let from = Math.max(1, currentPage - Math.round((pageSize - 1) / 2));
      let end = from + pageSize - 1;
      let range = [];

      if (end > last) {
        end = last;
        from = Math.max(1, end - pageSize + 1);
      }

      for (let i = from; i <= end; i++) {
        range.push(i);
      }
      return range;
    }
  }
};
</script>

<style lang="scss" scoped>
.todo {
  &__pages {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin-top: 2em;
    font-size: 1.25em;
  }
  &__page {
    margin: 0 0.5em;
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    text-decoration: none;

    &--current {
      font-weight: bold;
      transform: scale(1.5, 1.5);
    }
  }
}
</style>
