<template>
  <header class="header">
    <div class="container">
      <img src="../assets/ticketmaster.svg">
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    padding: 20px 0;
    height: 75px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background-color: rgb(2, 108, 223);
    img {
      max-width: 100%;
      height: 100%;
    }

  }
</style>