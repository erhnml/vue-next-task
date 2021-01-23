<template>
  <header class="header">
    <div class="container">
      <router-link to="/">
        <img src="../assets/ticketmaster.svg" />
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
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
    cursor: pointer;
  }
}
@media only screen and (max-width: 768px) {
  .header {
    margin-bottom: 10px;
    img {
      padding-left: 10px;
    }
  }
}
</style>
