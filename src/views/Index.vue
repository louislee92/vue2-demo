<template>
  <layout-main>
    <router-view></router-view>
  </layout-main>
</template>
<script>
import LayoutMain from "./layout/LayoutMain.vue";

export default {
  components: {LayoutMain},
  mounted() {
  }
}
</script>
