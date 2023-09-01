<template>
  <div class="wrapper">
    <ul class="content">
      <li v-for="r in $router.options.routes" @click="toRoute(r)">{{r.name}} - {{r.desc}}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.$router.options.routes)
  },
  computed: {
  },
  methods: {
    toRoute(r) {
      console.log(r)
      this.$router.push(r);
    }
  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  .content {
    margin: auto; width: 50%;
    li {
      cursor:pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
