<template>
  <div>
    <h1>svg动画</h1>
    <svg>
      <rect x="20" y="20" rx="10" ry="10" width="150" height="100" fill="red" stroke="white" stroke-width="5" opacity="0.6"/>
    </svg>
    <svg>
      <circle cx="100" cy="70" r="50" fill="red" stroke="white" stroke-width="5" opacity="0.6" />
    </svg>
    <svg>
      <ellipse cx="100" cy="70" rx="50" ry="30" fill="red" stroke="white" stroke-width="5" opacity="0.6" />
    </svg>
    <svg>
      <line x1="20" y1="20" x2="150" y2="100" stroke="red" stroke-width="5" opacity=".6"/>
    </svg>
    <svg>
      <polygon points="40,40 80,90 150,100 180,30 100,20" fill="red" stroke="white" stroke-width="5" opacity=".6" />
    </svg>
    <svg>
      <polyline points="50,50 100,150 150,30 100,20" fill="none" stroke="white" stroke-width="5" opacity=".6"/>
    </svg>
    <!-- 大写-绝对定位，小写-相对定位 -->
    <!-- M：移动位置，L直线，H：水平线，V：垂线，C：三次曲线，S：平滑三次曲线，Q：二次曲线，T：平滑二次曲线，A：圆弧曲线，Z，闭合路径 -->
    <svg>
      <path d="M20 20 L30 130 H50 V100 C75 140,75 140,100 100 S125 150,150 100 Q200 100,190 50 T150 50 A10 10 0 0 0 100 50 Z " fill="none" stroke="white" stroke-width="5" opacity=".6"/>
      <circle r="5" fill="red">
        <!-- rotate="auto" 会让运行轨迹 有方向 -->
        <animateMotion path="M20 20 L30 130 H50 V100 C75 140,75 140,100 100 S125 150,150 100 Q200 100,190 50 T150 50 A10 10 0 0 0 100 50 Z"
                       begin="0s" dur="3s" rotate="auto" repeatCount="indefinite"/>
      </circle>
    </svg>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

svg {
  width: 200px;
  height: 150px;

  path,polyline,line {
    fill:transparent;
    stroke:white;
    stroke-width: 5px;
    stroke-dasharray: 1300px;
    stroke-dashoffset: 1300px;
    animation: run 2s linear forwards;
  }
}
@keyframes run{
  0%{
    stroke-dashoffset:1300px;
  }
  100%{
    stroke-dashoffset: 0px;
  }
}
</style>
