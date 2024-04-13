<template>
  <div class="app">
    <el-select class="fixed" v-model="test" @change="onchange">
      <el-option v-for="(it, idx) in $router.options.routes"
                 :key="`key${idx}`"
                 :label="it.desc"
                 :value="it.path" ></el-option>
    </el-select>
    <router-view class="right-content"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        test: ''
      }
  },
  created() {
    // this.$store.dispatch("user/getCurUser").catch(e => {
    //   console.log("app 获取用户信息出错：" , e)
    //   this.$router.push({path: '/'})
    // })
  },
  mounted() {
    console.log(this.$router);
  },
  methods: {
    onchange() {
      this.$router.push(this.test);
    }
  }
}
</script>

