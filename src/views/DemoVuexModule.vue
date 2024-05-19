<template>
  <div class="view-demo-vuex-module">
    <div class="markdown" v-html="html"></div>
  </div>
</template>

<script>
import markdownit from 'markdown-it'
import hljs from 'highlight.js';
import 'highlight.js/styles/obsidian.css'
export default {
  data()  {
    return{
      html: '',
    }
  },
  mounted() {
    // 创建一个新的XMLHttpRequest对象
    var xhr = new XMLHttpRequest();

    // 配置HTTP请求
    // 这里的URL是你想要获取文本数据的地址
    xhr.open('GET', '/static/docs/vuex-module.md', true);

    // 设置请求完成的处理函数
    xhr.onreadystatechange = () => {
      // 请求完成并且响应状态码是200
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 处理获取到的文本数据
        var textData = xhr.responseText;
        console.log(textData);
        const md = markdownit({
          html: true,
          linkify: true,
          typographer: true,
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }

            return ''; // use external default escaping
          }
        })
        const result = md.render(textData);
        console.log(result)
        this.html = result;
      }
    };

    // 发送HTTP请求
    xhr.send();

  }
}
</script>


<style lang="scss" scoped>
.markdown {
  padding: .3rem;
}
</style>
