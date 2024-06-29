<template>
  <ctp-table :tableData="tableData" :tableHeaders="tableHeaders" @row-click="rowClick"
             :stripe="true" :show-overflow-tooltip="true" tooltip-effect="light"
             :cell-class-name="cellClassName" :header-cell-class-name="headerCellClassName">

  </ctp-table>
</template>

<script>
import CtpTable from "./components/CtpTable.vue";

export default {
  components: {CtpTable},
  data() {
    return {
      tableHeaders: [
        {type: 'index', label: '序号'},
        {label: '日期', value: 'date'},
        {label: '姓名', value: 'name'},
        {label: '省份', value: 'province'},
        {label: '地市', value: 'city'},
        {label: '地址', value: 'address'},
        {label: '地市', value: 'city'},
        {label: '地址', value: 'address'},
        {label: '地市', value: 'city'},
        {label: '地址', value: 'address'},
        {label: '地市', value: 'city'},
        {label: '地址', value: 'address'},
        {label: '地市', value: 'city'},
        {label: '地址', value: 'address'},
        {label: '地市', value: 'city'},
        {label: '地址地址地址地址', value: 'address'},
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        tag: '公司'
      }],
      // 数据单元格class
      cellClassName({row, column, rowIndex, columnIndex}) {
        return "cell-data-" + column.property + (column.property == 'address' ? ' el-tooltip' : '');
      },
      // 头部单元格class
      headerCellClassName({row, column, rowIndex, columnIndex}) {
        console.log(row, column, rowIndex, columnIndex)
        return "cell-header-" + column.property + (column.property == 'address' ? ' el-tooltip' : '');
      }
    }
  },
  mounted() {

  },
  methods: {
    rowClick(row, column, event) {
      console.log(row, column, event)
    }
  }
}
</script>
