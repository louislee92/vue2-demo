<template>
  <div class="pdf-box" ref="agreemenContent">
    <canvas class="canvas" v-for="page in pages" :id="'the-canvas' + page" :key="page" ref="pdf"></canvas>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
import vi from "element-ui/src/locale/lang/vi";

export default {
  data() {
    return {
      pages:[]
    }
  },
  mounted() {
    var pdfurl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
    pdfurl = '/static/Java-Top10.pdf';
    this._loadFile(pdfurl)
  },
  methods:{
    _renderPage (num) {
      this.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        let viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        // canvas.style.width = viewport.width + 'px'
        canvas.style.width = '100%'  //设置宽度
        // canvas.style.height = viewport.height + 'px'  //设置高度，可以不设
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (this.pages > num) {
          this._renderPage(num + 1)
        }
      })
    },
    _loadFile (url) {
      PDFJS.getDocument(url).then((pdf) => {
        this.pdfDoc = pdf
        this.pages = this.pdfDoc.numPages
        this.$nextTick(() => {
          this._renderPage(1)
        })
      })
    },
  }

}
</script>


<style lang="scss">
.pdf-box {
  width: 60%; margin: auto;
  .canvas {
    margin-top: .1rem;
    box-shadow: 0 0 20px black;
  }
}
</style>
