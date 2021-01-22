<template>
  <Header />
  <div class="container">
    <div class="wrapper" v-if="event">
      <div v-if="event" class="event-image" :style="getEventImageStyle"></div>
      <h1 class="event-name"> {{ event && event.name }}</h1>
      <p>{{ event.info }}</p>
      <p>{{ event.dates.start.dateTime }}</p>
      <p v-if="event.priceRanges">{{ event.priceRanges[0].min}} - {{event.priceRanges[0].max}} {{event.priceRanges[0].currency}}</p>
      <p v-for="product in event.products" :key="product.id">{{product.name}}</p>
      <img v-if="event.seatmap" :src="event.seatmap.staticUrl"/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'Detail',
  components: {
    Header
  },
  data() {
    return {
      event: null
    }
  },
  computed: {
    getEventImageStyle() {
      if(this.event) {
        return `background: url(${this.event.images[0].url}) no-repeat center center`;
      }
    }
  },
  async mounted() {
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${this.$route.params.id}.json?apikey=U34YVlos9iqC8hlpBIywd10EyyRngDxA`)
    const json = await res.json();
    this.event = json;
  }
}
</script>

<style lang="scss" scoped>
  .event-image {
    height: 400px;
    background-size: cover;
  }
</style>
