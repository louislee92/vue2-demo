<template>
  <div class="wrapper">
    <el-button>上一页</el-button>
    <el-button>下一页</el-button>

    <pdf src=""></pdf>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
import pdf from 'vue-pdf';
export default {
  name: 'PdfPreview',
  components: {pdf},
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  text-align: center;

}
</style>
