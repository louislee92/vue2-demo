<template>
  <div class="pdf-box-wrapper" ref="agreemenContent">
    <el-button @click="resize(0.1)">放大</el-button>
    <el-button @click="resize(-0.1)">缩小</el-button>
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
    var pdfurl = '/static/Java-Top10.pdf';
    this._loadFile(pdfurl)
  },
  methods:{
    // 加载文件
    _loadFile (url) {
      PDFJS.getDocument(url).then(this._loadDoc)
    },
    _loadDoc(pdf) {
      this.pages = [];
      this.pdfDoc = pdf
      this.pages = this.pdfDoc.numPages
      this.$nextTick(() => {
        this._renderPage(1)
      })
    },
    // 渲染页面 num
    _renderPage (num) {
      this.pdfDoc.getPage(num).then((page) => {
        let pageDiv = document.getElementById(`page-${num}`)
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let viewport = page.getViewport(this.scale)
        console.log(viewport)
        canvas.height = viewport.height
        canvas.width = pageDiv.offsetWidth;

        // let dpr = window.devicePixelRatio || 1
        // let bsr = ctx.webkitBackingStorePixelRatio ||
        //   ctx.mozBackingStorePixelRatio ||
        //   ctx.msBackingStorePixelRatio ||
        //   ctx.oBackingStorePixelRatio ||
        //   ctx.backingStorePixelRatio || 1
        // let ratio = dpr / bsr
        // console.log(dpr, bsr)

        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext).then(() => {
          console.log(page);
          console.log(page.getTextContent())
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
        // 继续渲染下一页
        if (this.pages > num) {
          this._renderPage(num + 1)
        }
      })
    },
    // 缩放
    resize(size) {
      this.scale += size;
      this._loadDoc(this.pdfDoc);
    }
  }

}
</script>


<style lang="scss" scoped>
.pdf-box-wrapper {
  width: 60%; height: 100%; margin: auto; overflow: auto;
  .pdf-box {
    margin-top: .1rem;
    box-shadow: 0 0 20px black;
    position: relative;
  }
}
</style>
