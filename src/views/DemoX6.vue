<template>
  <div class="wrapper">
    <div class="side">
      <div class="list-item" v-for="it in list" draggable="true"
           @dragstart="handleOndragstart($event, it)"
           @dragend="handleOndragend($event, it)"><i :class="it"></i></div>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import { register, getTeleport } from '@antv/x6-vue-shape'
import Node1 from './antv-x6/Node1.vue'
export default {
  data() {

    return {
      graph: null,
      list: ["el-icon-user", "el-icon-search", "el-icon-menu", "el-icon-remove", "el-icon-refresh"],
    }
  },
  mounted() {
    this.graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA',
      },
    })

    // 将节点添加到画布上
    // graph.fromJSON(data) // 渲染元素
    // graph.centerContent() // 居中显示

    // 注册自定义节点
    register({
      shape: 'custom-vue-node',
      x: 200,
      y: 100,
      width: 100,
      height: 50,
      component: Node1
    })

    const graph = this.graph;
    // graph.on('cell:click', ({ e, x, y, cell, view }) => {
    //   console.log('cell:click', e,x,y, cell, view)
    // })
    graph.on('node:click', ({ e, x, y, node, view }) => {
      console.log('node:click', e,x,y, node, view)
    })
    graph.on('edge:click', ({ e, x, y, edge, view }) => {
      console.log('edge:click', e,x,y, edge, view)
    })
    graph.on('blank:click', ({ e, x, y }) => {
      console.log('blank:click', e,x,y)
    })

    graph.on('cell:mouseenter', ({ e, cell, view }) => { })
    graph.on('node:mouseenter', ({ e, node, view }) => { })
    graph.on('edge:mouseenter', ({ e, edge, view }) => { })
    graph.on('graph:mouseenter', ({ e }) => { })

  },
  methods: {

    // 拖拽开始
    handleOndragstart(e, it) {
      console.log('start', e)
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },
    // 拖拽结束
    handleOndragend(e, it) {
      console.log(e, it);


      let left = 300;

      let x = e.x - left - this.offsetX;
      let y = e.y - this.offsetY;



      this.graph.addNode({
        id: "" + Math.random(),
        shape: 'custom-vue-node', // 指定使用何种图形，默认值为 'rect'
        x: x, y: y,
        width: 60,
        height: 60
      })

      // let graph = this.graph;
      // const node  = graph.addNode({
      //   shape: 'custom-node',
      //   x: x, y: y,
      // })
      // node.attr('title/text', it)

    }
  }
}
</script>


<style lang="scss">
.wrapper {
  width: 100%; height: 100%;
  display: flex;

  $--side-width: 1rem;

  .side {
    width: $--side-width;
    height: 100%;

    .list-item {
      width: .8rem; height: .8rem; margin-left: .1rem;
      background: #5c6b75;
      margin-top: .1rem; border-radius: .1rem;
      display: flex; align-items: center; justify-content: center;
      font-size: .5rem;
      color: black;
      cursor: pointer;

      &:hover {
        background: #85aad0;
      }
    }
  }

  #mountNode {
    width: calc(100% - #{$--side-width});
    height: 100%;
  }
}
</style>
