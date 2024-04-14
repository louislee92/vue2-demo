<template>
  <div class="pdf-box-wrapper" ref="agreemenContent">
    <el-button @resize="resize(0.1)">放大</el-button>
    <el-button @resize="resize(-0.1)">缩小</el-button>
    <div v-for="num in pages" :id="`page-${num}`" :key="num" class="pdf-box">
      <canvas class="canvas" :id="'the-canvas' + num" ref="pdf"></canvas>
    </div>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'

export default {
  data() {
    return {
      pages:[],
      scale: 1,
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
        let pageDiv = document.getElementById(`page-${num}`)
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        let viewport = page.getViewport(pageDiv.clientWidth / page.getViewport(1).width)
        // let viewport = page.getViewport(this.scale)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        // canvas.style.width = '100%'  //设置宽度
        // canvas.style.height = viewport.height + 'px'  //设置高度，可以不设
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext).then(() => {
          return page.getTextContent()
        }).then((textContent) => {
          // 创建文本图层div
          const textLayerDiv = document.createElement('div')
          textLayerDiv.setAttribute('class', 'textLayer')
          // 将文本图层div添加至每页pdf的div中
          pageDiv.appendChild(textLayerDiv)
          // 创建新的TextLayerBuilder实例
          let textLayer = new TextLayerBuilder({
            textLayerDiv: textLayerDiv,
            pageIndex: page.pageIndex,
            viewport: viewport
          })
          textLayer.setTextContent(textContent)
          textLayer.render()
        })
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
    resize(size) {
      this.scale += size;
    }
  }

}
</script>


<style lang="scss">
.pdf-box-wrapper {
  width: 60%; margin: auto;
  .pdf-box {
    margin-top: .1rem;
    box-shadow: 0 0 20px black;
    position: relative;
  }
}
</style>
