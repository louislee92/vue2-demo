<template>
  <div class="view-nav-menu">
    <div class="menu-item" v-for="item in menus" @click="menuOnClick(item)">{{item.label}}</div>
  </div>
</template>

<script>
import RouterConf from "../../router/RouterConf";
export default {
  data() {
    return {
      menus:RouterConf.router
    }
  },
  mounted() {
    console.log(this.$router)
  },
  methods: {
    menuOnClick(item) {
      this.$router.push(item.path);
    }
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/varibles";
.view-nav-menu {
  background: $--panel-bg-color-base2;
  text-align: center; padding-top: .1rem;
  overflow: auto;

  .menu-item {
    width: 100%; height: .5rem; line-height: .5rem;
    background: transparent; cursor: pointer;
    &:hover {
      background: rgba(255,255,255,0.1)
    }
  }
}
</style>
