<template>
  <div class="rounded-corner">
    <div class="content">
      铁路数据
    </div>
  </div>
</template>

<script>
export default {
  props: {
    click: {type: Function, default: (params) => {
        console.log('node1 on click: ', params)
      }}
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.rounded-corner {
  background-color: purple;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border: 5px solid limegreen;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  color: white;
  font-size: 20px;
  font-weight: bold;
}
</style>
