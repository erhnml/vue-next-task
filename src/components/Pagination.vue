<template>
  <div class="pagination">
    <button
      class="page"
      @click="$emit('update:modelValue', modelValue - 1)"
      :disabled="modelValue == 1"
    >
      Prev
    </button>
    <button
      class="page"
      v-for="page in totalPage"
      :key="page"
      :class="{
        active: page === modelValue,
        hide: hidePaginationPage(page),
      }"
      @click="$emit('update:modelValue', page)"
    >
      {{ page }}
    </button>
    <button
      class="page"
      @click="$emit('update:modelValue', modelValue + 1)"
      :disabled="modelValue == totalPage"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    modelValue: Number,
    total: Number,
    size: Number,
  },
  emits: ["update:modelValue"],
  computed: {
    totalPage() {
      const { size, total } = this;
      return Math.ceil(total / size);
    },
  },
  methods: {
    hidePaginationPage(page) {
      const { modelValue, totalPage } = this;
      return (
        (page > modelValue + 1 || page < modelValue - 1) && page < totalPage
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 32px;
    height: 32px;
    background: #fafafa;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    padding: 0 5px;
    user-select: none;
    cursor: pointer;
    font-size: 14px;
    &.active {
      border: 2px solid #026cdf;
    }
    &.hide {
      display: none;
    }
  }
}
</style>
