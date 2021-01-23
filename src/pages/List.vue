<template>
  <Header />
  <div class="container">
    <div class="content">
      <Search v-model="keyword" @onSearch="fetchData" />
      <Loader v-if="loading" />
      <Table v-else to="/detail" :columns="columns" :dataSource="events" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Table from "../components/Table.vue";
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "List",
  model: {
    prop: "title",
    event: "change",
  },
  components: {
    Table,
    Header,
    Search,
    Loader,
  },
  data() {
    return {
      keyword: "",
      events: [],
      loading: true,
      columns: [
        {
          label: "Name",
          dataIndex: "name",
        },
        {
          label: "Type",
          dataIndex: "type",
          render: (value) => value.toUpperCase(),
        },
        {
          label: "Date",
          dataIndex: ["dates", "start", "dateTime"],
          render: (value) => moment(value).format("LLLL"),
        },
        {
          label: "Price",
          dataIndex: ["priceRanges", "0", "min"],
          render: (value) => (value ? `$${value}` : "-"),
        },
      ],
    };
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.keyword}&size=100&apikey=U34YVlos9iqC8hlpBIywd10EyyRngDxA`
      );
      const json = await res.json();
      this.events = json?._embedded?.events || [];
      this.loading = false;
    },
  },
};
</script>
