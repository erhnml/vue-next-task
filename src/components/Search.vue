<template>
  <div class="search">
    <img class="search-icon" src="../assets/search.svg"/>
    <input 
      @change="$emit('update:modelValue', $event.target.value)" 
      :value="modelValue" 
      @keyup.enter="onClick"
    />
    <button @click="onClick">Ara</button>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
    onClick: Function,
    modelValue: String
  },
  emits: ['update:modelValue'],
}
</script>

<style lang="scss" scoped>
  .search {
    width: 50%;
    margin-left: auto;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
    height: 45px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .search-icon {
      width: 30px;
      height: 30px;
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
</style>