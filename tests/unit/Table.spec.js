import { shallowMount } from "@vue/test-utils";
import Table from "@/components/Table.vue";
const mockColumnsData = [
  {
    label: "Name",
    dataIndex: "name",
  },
  {
    label: "Page Count",
    dataIndex: "pageCount",
  },
  {
    label: "Price",
    dataIndex: "price",
  },
];

const books = [
  {
    name: "Book 1",
    pageCount: 245,
    price: 20,
  },
  {
    name: "Book 2",
    pageCount: 455,
    price: 40,
  },
  {
    name: "Book 3",
    pageCount: 125,
    price: 10,
  },
];

describe("Table.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Table, {
      propsData: {
        columns: mockColumnsData,
        dataSource: books,
      },
    });
  });

  test("renders column", () => {
    const columns = wrapper.findAll(".table-column");
    const firstColumn = columns[0];
    const lastColumn = columns[columns.length - 1];
    expect(firstColumn.text()).toBe("Name");
    expect(lastColumn.text()).toBe("Price");
    expect(columns.length).toBe(mockColumnsData.length);
  });

  test("renders row", () => {
    const rows = wrapper.findAll(".table-row");
    expect(rows.length).toBe(books.length);
  });

  test("renders cell", () => {
    const rows = wrapper.findAll(".table-row");
    const firstRow = rows[0].findAll("td");
    const lastRow = rows[rows.length - 1].findAll("td");
    expect(firstRow.length).toBe(mockColumnsData.length);
    expect(lastRow.length).toBe(mockColumnsData.length);
  });

  test("low to high sorting", async () => {
    const columns = wrapper.findAll(".table-column");
    await columns[columns.length - 1].trigger("click");
    const firstRow = wrapper.findAll(".table-row")[0];
    const firstCell = firstRow.findAll("td")[mockColumnsData.length - 1];
    expect(wrapper.vm.sorting.key).toBe("price");
    expect(wrapper.vm.sorting.sort).toBe("lowToHigh");
    expect(firstCell.text()).toBe("10");
  });

  test("high to low sorting", async () => {
    const columns = wrapper.findAll(".table-column");
    const lastColumn = columns[columns.length - 1];
    await lastColumn.trigger("click");
    await lastColumn.trigger("click");
    const firstRow = wrapper.findAll(".table-row")[0];
    const lastCell = firstRow.findAll("td")[mockColumnsData.length - 1];
    expect(wrapper.vm.sorting.key).toBe("price");
    expect(wrapper.vm.sorting.sort).toBe("highToLow");
    expect(lastCell.text()).toBe("40");
  });

  test("clear sorting data", async () => {
    const columns = wrapper.findAll(".table-column");
    const lastColumn = columns[columns.length - 1];
    await lastColumn.trigger("click");
    await lastColumn.trigger("click");
    await lastColumn.trigger("click");
    const firstRow = wrapper.findAll(".table-row")[0];
    const lastCell = firstRow.findAll("td")[2];
    expect(wrapper.vm.sorting).toBe(null);
    expect(lastCell.text()).toBe("20");
  });
});
