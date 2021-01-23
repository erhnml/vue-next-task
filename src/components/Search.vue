<template>
  <div class="search">
    <img class="search-icon" src="../assets/search.svg" />
    <input
      @change="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      @keyup.enter="$emit('onSearch')"
    />
    <button @click="$emit('onSearch')">Search</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue", "onSearch"],
};
</script>

<style lang="scss" scoped>
.search {
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  height: 45px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .search-icon {
    width: 25px;
    height: 25px;
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0px;
    font-size: 20px;
    outline: none;
    padding-left: 20px;
  }
  button {
    font-weight: 600;
    font-size: 16px;
    height: 100%;
    padding: 0px 14px;
    min-width: 60px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    color: rgb(255, 255, 255);
    background-color: rgb(2, 108, 223);
    border: 1px solid transparent;
  }
}
@media only screen and (max-width: 768px) {
  .search {
    button {
      display: none;
    }
  }
}
</style>
