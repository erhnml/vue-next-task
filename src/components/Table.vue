<template>
  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th
            class="table-column"
            v-for="{ dataIndex, label } in columns"
            :key="dataIndex"
            @click="handleSort(dataIndex)"
          >
            {{ label }}
            <div class="th-icons" v-if="sorting && sorting.key === dataIndex">
              <img
                v-if="sorting.sort === 'highToLow'"
                class="th-icon"
                src="../assets/up.svg"
              />
              <img v-else class="th-icon" src="../assets/down.svg" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, i) in getData"
          :key="i"
          class="table-row"
          :class="{ 'link-row': to }"
        >
          <td
            v-for="column in columns"
            :key="column.dataIndex"
            @click="handleRowClick(data)"
          >
            {{ getValueByIndex(column, data) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="no-data-text" v-if="dataSource.length === 0">Veri bulunamadı...</p>
  <Pagination :size="10" v-model="currentPage" :total="dataSource.length" />
</template>

<script>
import _ from "lodash";
import Pagination from "./Pagination.vue";

export default {
  name: "Table",
  components: {
    Pagination,
  },
  props: {
    columns: Array,
    dataSource: Array,
    to: String,
  },
  data() {
    return {
      size: 10,
      currentPage: 1,
      sorting: null,
    };
  },
  computed: {
    getData() {
      const { currentPage, size, dataSource, sorting } = this;
      const start = (currentPage - 1) * size;
      const end = currentPage * size;
      let modifyData = [...dataSource];
      if (sorting) {
        const { key, sort } = sorting;
        modifyData.sort((a, b) => {
          var aValue = Array.isArray(key) ? _.get(a, key) : a[key];
          var bValue = Array.isArray(key) ? _.get(b, key) : b[key];
          if (aValue < bValue) {
            return sort === "lowToHigh" ? -1 : 1;
          } else if (bValue < aValue) {
            return sort === "lowToHigh" ? 1 : -1;
          }
          return 0;
        });
      }
      return modifyData.slice(start, end);
    },
    totalPage() {
      return Math.ceil(this.dataSource.length / this.size);
    },
  },
  methods: {
    getValueByIndex(column, data) {
      const { dataIndex, render } = column;
      const value = Array.isArray(dataIndex)
        ? _.get(data, dataIndex)
        : data[dataIndex];
      return render ? render(value, data) : value;
    },
    handleRowClick({ id }) {
      const { to, $router } = this;
      if (to) {
        $router.push(`${to}/${id}`);
      }
    },
    handleSort(index) {
      const { sorting } = this;
      if (!sorting || sorting.key != index) {
        this.sorting = {
          key: index,
          sort: "lowToHigh",
        };
      } else if (sorting.sort == "highToLow") {
        this.sorting = null;
      } else {
        this.sorting = {
          ...sorting,
          sort: "highToLow",
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  overflow-x: auto;
}
table {
  table-layout: auto;
  color: rgba(0, 0, 0, 0.85);
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  font-size: 16px;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  tr,
  td,
  th {
    padding: 16px;
    overflow-wrap: break-word;
  }
  thead > tr > th {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    text-align: left;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s ease;
    cursor: pointer;
    position: relative;
    &:hover {
      background-color: #ddd;
    }
    .th-icons {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      .th-icon {
        width: 15px;
        height: 15px;
      }
    }
  }
  tbody > tr {
    &:hover {
      background: #eee;
    }
    &.link-row {
      cursor: pointer;
    }
  }
  tbody > tr > td {
    border-bottom: 1px solid #d3d3d3;
  }
}
.no-data-text {
  text-align: center;
}
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
