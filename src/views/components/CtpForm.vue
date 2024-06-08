<!--

可修改表单组件功能
1. 默认展示，不可修改
2. 鼠标移到字段展示编辑按钮
3. 点击编辑按钮该字段进入编辑模式，并聚焦
4. 失去焦点则进行触发变更事件

-->
<template>
  <!-- 表单组件 -->
  <el-form ref="form" class="view-ctp-form"
           :model="form"
           :rules="rules"
           :label-width="labelWidth" :label-position="labelPosition">
    <template v-for="(item, index) in formItemArr">
      <el-form-item v-bind="item" :class="`${edit[item.name]?'edit-mode':'normal-mode'}`">
        <!-- 编辑模式 -->
        <template v-if="edit[item.name]">
          <!-- 下拉框 -->
          <el-select v-if="item.type=='select'"
                     v-model="form[item.name]"
                     :ref="item.name"
                     :multiple="item.multiple || false"
                     @selcct="outEditMode(item)">
            <el-option v-for="d in getOptions(item)"
                       :value="d.value"
                       :label="d.label"
                       :key="d.value"></el-option>
          </el-select>
          <!-- 普通输入框 -->
          <el-input v-else
                    v-model="form[item.name]"
                    :ref="item.name"
                    @blur="outEditMode(item)"></el-input>
        </template>
        <!-- 展示模式 -->
        <template v-else>
          <span class="text">
            <template v-if="item.type == 'select'">{{getOptionLabel(item)}}</template>
            <template v-else>{{form[item.name]}}</template>
            <slot name="edit-btn">
              <div class="edit-btn-wrapper">
                <i class="edit-btn el-icon-edit-outline" @click="enterEditMode(item)"></i>
              </div>
            </slot>
          </span>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>

// 表单值修改事件
const EVENT_ITEM_ON_CHANGE = 'change';

export default {
  props: {
    labelPosition: {type: String, default: 'right'},
    labelWidth: {type: String, default: '.7rem'},
    formItemArr: {type: Array, default: () => []},
    value: {type: Object, default: () => {}},
  },
  model: {
    prop: 'value',
    event: 'update',
  },
  data() {
    return{
      oldForm: JSON.parse(JSON.stringify(this.value)),
      form: JSON.parse(JSON.stringify(this.value)),
      rules: {},
      edit: {},
    }
  },
  computed: {
    getOptions() {
      return item => item.options || [];
    },
    getOptionLabel() {
      return item => {
        let val = this.form[item.name]
        for(let i = 0; i < this.formItemArr.length; i++) {
          let itemConf = this.formItemArr[i]
          if(itemConf.options && itemConf.options.length > 0) {
            for(let j = 0; j < itemConf.options.length; j++) {
              let s = itemConf.options[j];
              if(val == s.value) return s.label;
            }
          }
        }
        return ''
      }
    }
  },
  mounted() {},
  methods: {
    validate(callback) {

    },
    resetFields() {

    },
    enterEditMode(item) {
      this.$set(this.edit, item.name, true);
      // focus
      this.$nextTick(() => {
        console.log('refs: ', this.$refs)
        this.$refs[item.name][0].focus();
      })
    },
    outEditMode(item) {
      this.$set(this.edit, item.name, false);
      let name = item.name;
      let value = this.form[item.name];
      let oldValue = this.oldForm[item.name];
      console.log('form item old new: ', oldValue, value)
      if(value != oldValue) {   // 没更新则不触发事件
        console.log('form item change', name , value)
        this.$emit(EVENT_ITEM_ON_CHANGE, name, value);
      }
    }
  }
}
</script>

<style lang="scss">
@import "./view-ctp-form";
</style>
