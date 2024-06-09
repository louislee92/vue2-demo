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
export default {

  data() {

    return {
      graph: null,
      list: ["el-icon-user", "el-icon-search", "el-icon-menu", "el-icon-remove", "el-icon-refresh"],
    }
  },
  mounted() {
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA',
      },
    })

    const data = {
      nodes: [],
      edges: [],
    }
    graph.fromJSON(data) // 渲染元素
    // graph.centerContent() // 居中显示
    this.graph  =graph;

    function remToPx(rem) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    // 注册节点
    let w = remToPx(.8);
    Graph.registerNode(
      'custom-node',
      {
        width: w,
        height: w,
        // 属性样式
        attrs: {
          body: {
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: 'rgba(95,149,255,0.05)',
            refWidth: 1,
            refHeight: 1,
          },
          image: {
            'xlink:href': 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            width: 16,
            height: 16,
            x: 12,
            y: 12,
          },
          title: {
            text: 'Node',
            refX: 40,
            refY: 14,
            fill: 'rgba(0,0,0,0.85)',
            fontSize: 12,
            'text-anchor': 'start',
          },
          text: {
            text: 'this is content text',
            refX: 12,
            refY: 38,
            fontSize: 12,
            class: 'el-icon-search',
            fill: 'rgba(0,0,0,0.6)',
            'text-anchor': 'start',
          },
        },
        // 配置属性
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
            selector: 'image',
          },
          {
            tagName: 'text',
            selector: 'title',
          },
          {
            tagName: 'text',
            selector: 'text',
          },
        ],
        // 连接桩
        ports: {
          groups: {
            group1: {
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
                text: {
                  fontSize: 12,
                  fill: '#888',
                },
              },
              // 文档：https://x6.antv.vision/zh/docs/api/registry/port-layout#left-right-top-bottom
              position: {
                name: 'right',
              },
            },
          },
          items: [
            {
              id: 'port1',
              group: 'group1',
            },
            {
              id: 'port3',
              group: 'group1',
            },
          ],
        },
      },
      true,
    )
  },
  methods: {

    handleOndragstart(e, it) {
      console.log('start', e)
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },
    handleOndragend(e, it) {
      console.log(e, it);

      function remToPx(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
      }

      let left = remToPx(3);
      let w = remToPx(.8);

      let x = e.x - left - this.offsetX;
      let y = e.y - this.offsetY;
      let obj = {
        left: x, top: y, icon: it
      }
      let graph = this.graph;
      const node  = graph.addNode({
        shape: 'custom-node',
        x: x,
        y: y,
      })
      node.attr('text/text', it)

      console.log('obj', obj)
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
