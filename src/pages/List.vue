<template>
  <Header />
  <div class="container">
    <Search v-model="keyword" :onClick="fetchData"/>
    <p v-if="loading">Loading...</p>
    <Table 
        v-else
        to="/detail" 
        :columns="columns" 
        :dataSource="events" 
      />
  </div>
</template>

<script>
import Table from '../components/Table.vue';
import Header from '../components/Header.vue';
import Search from '../components/Search.vue';

export default {
  name: 'List',
  model: {
    prop: 'title',
    event: 'change'
  },
  components: {
    Table,
    Header,
    Search
  },
  data() {
    return {
      keyword: '',
      events: [],
      loading: true,
      columns: [
        {
          label: 'Adı', 
          dataIndex: 'name'
        },
        {
          label: 'Tür',
          dataIndex: 'type'
        },
        {
          label: 'Başlama Tarihi', 
          dataIndex: ['dates', 'start','localDate']
        },
        {
          label: 'Fiyat', 
          dataIndex: ['priceRanges','0','min'], 
          render: value => value ? `${value} TL` : '-'
        }
      ]
    }
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.keyword}&size=100&apikey=U34YVlos9iqC8hlpBIywd10EyyRngDxA`)
      const json = await res.json();
      this.events = json?._embedded?.events || [];
      this.loading = false;
    }
  }
}

// api: U34YVlos9iqC8hlpBIywd10EyyRngDxA
</script>
