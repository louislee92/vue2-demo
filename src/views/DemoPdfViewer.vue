<!-- 使用官方demo：/static/pdfjs-3.1.81-dist/web/viewer.html -->
<template>
  <iframe class="view-demo-pdf-viewer" :src="src" width="100%" height="100%"></iframe>
</template>

<script>
export default {
  props: {
    src: {type: String, default: '/static/pdfjs-3.1.81-dist/web/viewer.html?file=http://localhost:8081/static/Java-Top10.pdf'},
  }
}
</script>

<style lang="scss" scoped>
.view-demo-pdf-viewer {
  border: none;
}
</style>
