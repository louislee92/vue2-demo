<template>
  <div class="wrapper" id="container">
    <div class="buttons">
      <p>{{currentPage}} / {{totalPage}}</p>
      <p><el-button @click="changePdfPage('first')" round icon="el-icon-caret-top"></el-button></p>
      <p><el-button @click="changePdfPage('pre')" round icon="el-icon-arrow-up"></el-button></p>
      <p><el-button @click="changePdfPage('next')" round icon="el-icon-arrow-down"></el-button></p>
      <p><el-button @click="changePdfPage('last')" round icon="el-icon-caret-bottom"></el-button></p>
      <p style="max-width: 100px;">
        vue-pdf官网：https://github.com/FranckFreiburger/vue-pdf#readme
      </p>
    </div>
    <pdf :src="src" v-show="loadedRatio==1" style="width: 50%;margin: auto;border: 1px solid grey;"
         :page="currentPage"
         @num-pages="totalPage=$event"
         @progress="loadedRatio=$event"
         @page-loaded="currentPage=$event"
         @loaded="loadPdfHandler"
         @link-clicked="currentPage=$event"
    ></pdf>
    <div class="progress" v-show="loadedRatio!=1">
      <el-progress type="circle" :width="70" color="#53a7ff"
                   :percentage="Math.floor(loadedRatio * 100)"></el-progress>
      <br><span>正在加载中，请稍候...</span>
    </div>
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
      src: "/static/Java-Top10.pdf",
      currentPage: 1,
      totalPage: 0,
      loadedRatio: 0,
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    loadPdfHandler(e) {
      console.log("loadPdfHandler", e)
    },
    changePdfPage(str) {
      if('first' == str)  {
        this.currentPage = 1;
        this.toTop()
      }
      if('pre' == str && this.currentPage > 1) {
        this.currentPage--;
        this.toTop()
      }
      if('next' == str && this.currentPage < this.totalPage) {
        this.currentPage++;
        this.toTop()
      }
      if('last' == str) {
        this.currentPage = this.totalPage
        this.toTop()
      }
    },
    toTop() {
      document.getElementById("container").scrollTop = 0;
    }
  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;

  .buttons {
    position: fixed;
    top: .2rem; right: .2rem;
    & > p {
      margin-bottom: .1rem;
    }
  }
  .progress {
    margin-top: .2rem;
  }
}
</style>
