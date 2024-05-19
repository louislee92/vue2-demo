<template>
  <div style="width: 50%; margin: auto;">
    <div class="" v-for="(f, index) in fonts" :style="`font-family: ${f}`">
      <h1>{{index + 1}}、字体名称：{{f}}</h1>
      <h1>一级标题</h1>
      <h2>二级标题</h2>
      <h3>三级标题</h3>
      <p style="font-size: 16px">16px大小的字体</p>
      <p style="font-size: 14px">14px大小的字体</p>
      <p style="font-size: 12px">12px大小的字体</p>
      <p style="font-size: 10px">10px大小的字体</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fonts: [
        "PingFang SC", "Lantinghei SC", "Microsoft YaHei",
        "HanHei SC", "Helvetica Neue", "Open Sans", "Hiragino Sans GB",
        '微软雅黑', 'STHeiti', "WenQuanYi Micro Hei",
        'Arial', 'SimSun', 'sans-serif'
      ]
    }
  }
}
</script>
