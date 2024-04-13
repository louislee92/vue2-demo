<template>
  <div class="wrapper" id="container">
    <pdf
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
    ></pdf>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
import pdf from 'vue-pdf';

var loadingTask =pdf.createLoadingTask('/static/Java-Top10.pdf');

export default {
  name: 'PdfPreview2',
  components: {pdf},
  data() {
    return {
      src: loadingTask,
      numPages: undefined,
    }
  },
  mounted() {
    this.src.promise.then(pdf => {

      this.numPages = pdf.numPages;
    });
  },
  computed: {
  },
  methods: {

  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  width: 60%; margin: auto;
  height: 100%;
  overflow: auto;
  border: 1px solid green;

}
</style>
