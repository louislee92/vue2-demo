<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
      return {
        test: ''
      }
  },
  created() {

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

<style lang="scss" >
.app {
  width: 100%; height: 100%;
}
</style>
