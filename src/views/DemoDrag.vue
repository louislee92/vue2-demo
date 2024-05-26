<template>
  <div class="view-demo-drag">
    <div class="drag-list">
      <div class="list-item" v-for="it in list" draggable="true"
           @dragstart="handleOndragstart($event, it)"
           @dragend="handleOndragend($event, it)"><i :class="it"></i></div>
    </div>
    <div class="drag-canvas">
      <div class="list-item canvas-item" v-for="it in list2" :style="`left: ${it.left}px; top: ${it.top}px;`"><i :class="it.icon"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: ["el-icon-user", "el-icon-search", "el-icon-menu", "el-icon-remove", "el-icon-refresh"],
      list2: [
      ],
      offsetX: 0,
      offsetY:0,
    }
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

      let left = remToPx(2);

      let newList = JSON.parse(JSON.stringify(this.list2));
      let x = e.x - left - this.offsetX;
      let y = e.y - this.offsetY;
      newList.push({
        left: x, top: y, icon: it
      })
      this.$set(this, 'list2', newList)

    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/varibles.scss";
.view-demo-drag {
  width: 100%; height: 100%;
  position: relative;
  .drag-list {
    position: absolute;
    top: .1rem; left: .1rem;
    bottom: .1rem; width: 1rem;
    background: rgba(255,255,255,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .drag-canvas {
    position: fixed;
  }

  .list-item {
    width: .8rem; height: .8rem;
    background: $--panel-bg-color-info;
    margin-top: .1rem; border-radius: .1rem;
    display: flex; align-items: center; justify-content: center;
    font-size: .5rem;
    color: black;
    cursor: pointer;

    &.canvas-item {
      position: absolute; margin: 0;
    }

    &:hover {
      background: $--btn-bg-clr-primary;
    }
  }


}
</style>
