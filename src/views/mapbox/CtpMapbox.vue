<template>
  <div class="wrapper">
    <div id="map" style="width: 100%; height: 100vh;"></div>
    <!--    <div class="btn">-->
    <!--      <el-button @click="area">点位可拖动</el-button>-->
    <!--      <el-button @click="popup">popUp弹框</el-button>-->
    <!--      <el-button @click="addpoint">撒点</el-button>-->
    <!--    </div>-->
    <div class="calculation-box">
      <p>Click the map to draw a polygon.</p>
      <div id="calculated-area"></div>
    </div>
  </div>
</template>

<script>
import * as turf from '@turf/turf';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import { CircleMode, DragCircleMode, DirectMode, SimpleSelectMode } from "mapbox-gl-draw-circle"; // 打包可能会遇到问题
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import mapboxGlDrawStyles from "./mapbox-gl-draw.styles";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";


export default {
  data() {
    return {
      map: null,  // 默认为null
      config: {},
    }
  },
  mounted() {

  },
  methods: {
    // 初始化地图
    initMap(conf, callback) {
      // 默认配置
      let defaultConf = {
        source: 'raster-tiles',
        minzoom: 2.6, maxzoom: 18, zoom: 10,
        center: [118.76, 32.02],
        zoomend: undefined,
      }
      // 最终配置
      const config = Object.assign({}, defaultConf, conf || {})
      console.log('mapbox config', config)
      this.config = config;
      // 构造mapbox配置
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
              tiles: [
                "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
              ],
              tilesSize: 256,
              minzoom: config.minzoom,
              maxzoom: config.maxzoom,
            },
          },
          // 3.2 配置地图图层
          layers: [
            {
              id: "tile-raster",
              type: "raster",
              source: config.source,
            },
          ],
        }, //地图风格，底图数据源
        // 水平角
        // bearing: 45,
        // 俯仰角
        // pitch: 0,
        center: config.center, //默认注视的坐标点
        zoom: config.zoom, //当前展示的地图级别
        projection: "mercator", //地图投影模式
      }
      if(this.map == null) {
        this.map = new window.mapboxgl.Map(gdMap);
        // 添加工具
        const draw = new MapboxDraw({
          displayControlsDefault: false,
          // Select which mapbox-gl-draw control buttons to add to the map.
          controls: {
            polygon: true,
            trash: true
          },
          // Set mapbox-gl-draw to draw by default.
          // The user does not have to click the polygon control button first.
          defaultMode: 'draw_polygon',
          styles: mapboxGlDrawStyles,
        });
        // this.map.on('draw.create', updateArea);
        // this.map.on('draw.delete', updateArea);
        // this.map.on('draw.update', updateArea);

        // function updateArea(e) {
        //   const data = draw.getAll();
        //   const answer = document.getElementById('calculated-area');
        //   if (data.features.length > 0) {
        //     const area = turf.area(data);
        //     // Restrict the area to 2 decimal points.
        //     const rounded_area = Math.round(area * 100) / 100;
        //     answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
        //   } else {
        //     answer.innerHTML = '';
        //     if (e.type !== 'draw.delete')
        //       alert('Click the map to draw a polygon.');
        //   }
        // }

        this.map.addControl(draw, 'top-right');
      }
      // 事件监听
      // 地图缩放结束监听
      this.map.on('zoomend', () => {
        if(config.zoomend) config.zoomend(this.map.getZoom());
      });
      // 地图缩放过程事件，用于设置最大最小zoom
      this.map.on('zoom', () => {
        if(config.minzoom > this.map.getZoom()) this.map.setZoom(config.minzoom);
        if(config.maxzoom < this.map.getZoom()) this.map.setZoom(config.maxzoom);
      });
      // 地图加载完成事件
      this.map.on('load', () => {
        if(callback) callback(this.map)
      });
      this.map._logoControl &&  this.map.removeControl( this.map._logoControl);
    },
    // 移动地图，设置缩放
    jumpTo(config) {
      this.map.jumpTo(config);
    },
    // 移动地图，设置缩放
    wrapJumpTo(center, zoom) {
      let config = {
        center: center || this.config.center,
        zoom: zoom || this.config.zoom,
      }
      this.jumpTo(config);
    },
    // 添加
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

<style lang="scss" scoped>
/* 你可以添加一些自定义样式 */
.wrapper {
  position: relative;
  width: 100%; height: 100%;
  .btn {
    position: absolute;
    top: .1rem; left: .1rem;
    z-index: 999
  }

  .calculation-box {
    height: 75px;
    width: 150px;
    position: absolute;
    bottom: 40px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    text-align: center;
    p {
      font-family: 'Open Sans';
      margin: 0;
      font-size: 13px;
    }
  }

}
</style>
