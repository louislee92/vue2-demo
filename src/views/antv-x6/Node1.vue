<template>
  <div class="rounded-corner">
    <div class="content">
      这是一段文字
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

}
</script>

<style scoped>
.rounded-corner {
  background-color: purple;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  color: white;
  font-size: 14px;
}
</style>
