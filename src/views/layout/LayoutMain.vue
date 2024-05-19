<template>
  <div class="view-layout-main">
    <nav-menu></nav-menu>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'
export default {
  components: {NavMenu}
}
</script>

<style scoped lang="scss">
@import "~@/styles/varibles";
.view-layout-main {
  width: 100%; height: 100%; overflow: hidden;
  position: relative; background: $--panel-bg-color-base1;
  color: $--text-color-info;

  .view-nav-menu {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: $--nav-menu-width;
  }

  .main-content {
    position: absolute;
    top: 0; left: $--nav-menu-width;
    right: 0; bottom: 0;
    overflow: auto;
  }
}
</style>
