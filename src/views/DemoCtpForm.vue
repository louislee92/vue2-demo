<template>
  <div class="demo-ctp-form">
    <ctp-form v-model="params" :form-item-arr="formItems" ref="CtpFormRef"></ctp-form>
  </div>
</template>

<script>
import CtpForm from "./components/CtpForm.vue";
export default {
  components: {CtpForm},
  data() {
    return {
      params: {
        name: 'test',
      },
      formItems: [
        {label: '活动名称', name: 'name'},
        {label: '活动区域', name: 'area', type: 'select', multiple: true,
          options: [{label: '区域一', value: '1'},{label: '区域二', value: '2'}]},
        {label: '活动时间', name: 'name2', row: 1},
        {label: '测试字段', name: 'name3', row: 2},
        {label: '测试字段', name: 'name4', row: 2},
        {label: '测试字段', name: 'name5', row: 3},
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.demo-ctp-form {

}
</style>
