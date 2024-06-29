<template>
  <el-table class="ctp-table" v-bind="$attrs" :data="$attrs.tableData" v-on="$listeners">
    <template v-for="it in $attrs.tableHeaders">
      <el-table-column v-if="it.type==='slot'" v-bind="it" :show-overflow-tooltip="it['show-overflow-tooltip'] || true"
                       :min-width="it.minWidth || it.width || '150'" :width="it.width || '150'">
        <slot name="it.prop || it.value"></slot>
      </el-table-column>
      <!-- 索引 index   selection/index/expand-->
      <el-table-column v-else v-bind="it" :prop="it.prop || it.value || undefined" :show-overflow-tooltip="it['show-overflow-tooltip'] || true"
                       :min-width="it.minWidth || it.width || '150'"  :width="it.width || '150'"></el-table-column>
    </template>
    <!-- 无数据 -->
    <template slot="empty">
      <div class="empty">
        <h1>无数据</h1>
      </div>
    </template>
  </el-table>
</template>

<script>
export default {
  mounted() {
    console.log("this.$attrs", this.$attrs);
    console.log("this.$props", this.$props);
    console.log("this.$listeners", this.$listeners);
    console.log("this.$scopeSlots", this.$scopeSlots);
  },

}
</script>

<style lang="scss">
.ctp-table {
  height: 100%;
  overflow: auto;

  .el-table__header-wrapper {
    .el-table__header {
      height: .5rem;
    }
  }

  .el-table__body-wrapper {
    height: calc(100% - .5rem);

    .el-table__empty-text {
      height: .5rem;
      text-align: center;
      transform: translateY(-50%);
    }

  }

  &.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background-color: rgba(255, 0,0,0.2);
  }

  .cell-header-address.el-tooltip > div.cell {
    white-space: nowrap;
  }

}
</style>
