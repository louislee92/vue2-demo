<!-- 使用官方demo：/static/pdfjs-3.1.81-dist/web/viewer.html -->
<template>
  <iframe class="view-demo-pdf-viewer" :src="src" width="100%" height="100%"></iframe>
</template>

<script>
export default {
  props: {
    url: {type: String, default: '/ctp/test/pdf'},
  },
  computed: {
    src() {
      return '/static/pdfjs-3.1.81-dist/web/viewer-chrome.html?file=' + this.url;
    }
  }
}
</script>

<style lang="scss" scoped>
.view-demo-pdf-viewer {
  border: none;
}
</style>
