<template>
  <Header />
  <div class="container">
    <div class="content">
      <Loader v-if="loading" />
      <div class="event" v-else>
        <div class="event-image" :style="getEventImageStyle"></div>
        <h1 class="event-name">{{ event.name }}</h1>
        <p>{{ event.info }}</p>
        <div class="event-date">
          <img class="event-icon" src="../assets/calendar.svg" />
          <span>{{ eventDate }}</span>
        </div>
        <div class="event-price">
          <img class="event-icon" src="../assets/price.svg" />
          <span v-if="event.priceRanges">
            {{ event.priceRanges[0].min }} - {{ event.priceRanges[0].max }}
            {{ event.priceRanges[0].currency }}
          </span>
          <span v-else>-</span>
        </div>
        <div class="products">
          <div
            class="product"
            v-for="product in event.products"
            :key="product.id"
          >
            <p class="product-name">
              {{ product.name }}
            </p>
            <button class="product-buy-btn">Buy Ticket</button>
          </div>
        </div>
        <div class="seatmap">
          <img v-if="event.seatmap" :src="event.seatmap.staticUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Header from "../components/Header.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Detail",
  components: {
    Header,
    Loader,
  },
  data() {
    return {
      event: null,
      loading: true,
    };
  },
  computed: {
    getEventImageStyle() {
      if (this.event) {
        return `background: url(${this.event.images[0].url}) no-repeat center center;background-size: cover;`;
      }
    },
    eventDate() {
      return moment(this.event.dates.start.dateTime).format("LLLL");
    },
  },
  async mounted() {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${this.$route.params.id}.json?apikey=U34YVlos9iqC8hlpBIywd10EyyRngDxA`
    );
    const json = await res.json();
    this.event = json;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.event {
  .event-icon {
    width: 30px;
    height: 30px;
  }
  .event-image {
    height: 400px;
  }
  .event-name {
    font-size: 42px;
    font-weight: 500;
  }
  .event-date,
  .event-price {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-left: 10px;
    }
  }
  .products {
    .product {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d3d3d3;
      padding: 10px 0px;
      &-buy-btn {
        background: black;
        border: none;
        color: white;
        padding: 8px 15px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .seatmap {
    margin-top: 30px;
    padding: 20px;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
}
</style>
