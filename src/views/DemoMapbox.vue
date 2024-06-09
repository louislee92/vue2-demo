<template>
  <div class="wrapper">
    <div id="map" style="width: 100%; height: 100vh;"></div>
    <div class="btn">
      <el-button @click="area">点位可拖动</el-button>
      <el-button @click="popup">popUp弹框</el-button>
      <el-button @click="addpoint">撒点</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmdjaGFvY2hhbyIsImEiOiJjbGU1aDZ2eWUwMXp4M29udmFnNnNyZjBhIn0.2Kd0ZX06ReEdBnZ9XU4XUA';
    this.show();
  },
  methods: {
    show() {

      let gdMap = {
        // 在这个对象中，我们填入一些地图相关的参数设置
        container: "map", //地图容器
        style: {
          version: 8,
          // 3.1 定义地图数据源
          sources: {
            // 栅格瓦片
            // 定义数据源类型
            "raster-tiles": {
              // 定义类型，raster栅格，vector矢量
              type: "raster",
              // 地图服务
              //
              tiles: [
                "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
              ],
              tilesSize: 256,
            },
          },
          // 3.2 配置地图图层
          layers: [
            {
              id: "tile-raster",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        }, //地图风格，底图数据源
        // 水平角
        // bearing: 45,
        // 俯仰角
        // pitch: 0,
        center: [118.76, 32.02], //默认注视的坐标点
        zoom: 10, //当前展示的地图级别
        projection: "globe", //地图投影模式
      }

      this.map = new window.mapboxgl.Map(gdMap);
    },
    // 区域着色
    area() {
      let map = this.map;
      const marker = new window.mapboxgl.Marker({
        color: "red",
        draggable: true
      }).setLngLat([118.76, 32.02])
        .addTo(map);
    },
    // pop 弹框
    popup () {
      let map = this.map;
      const markerHeight = 50;
      const markerRadius = 10;
      const linearOffset = 25;
      const popupOffsets = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
      };
      const popup = new window.mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
        .setLngLat([118.76, 32.02])
        .setHTML("<h1 style='background: #ddd; color: black;'>Hello World!</h1>")
        .setMaxWidth("300px")
        .addTo(map);
    },
    // 撒点
    addpoint() {

      let map = this.map;
      // 添加点状图层
      map.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [118.76, 32.02] // 点的坐标
                }
              } // 可以添加更多的点
            ]
          }
        },
        'paint': {
          'circle-radius': 10, // 点的半径大小
          'circle-color': '#FF0000' // 点的颜色
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 你可以添加一些自定义样式 */
.wrapper {
  position: relative;
  .btn {
    position: absolute;
    top: .1rem; left: .1rem;
    z-index: 999
  }
}
</style>
