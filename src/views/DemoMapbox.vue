<template>
  <ctp-mapbox ref="CtpMapboxRef"></ctp-mapbox>
</template>

<script>
import CtpMapbox from "./mapbox/CtpMapbox.vue";
export default {
  components: {CtpMapbox},
  data() {
    return {

    }
  },
  mounted() {
    this.$refs.CtpMapboxRef.initMap({}, (map) => {
      console.log('轨迹播放', map)
      // 添加GeoJSON源
      map.addSource('trace', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [118.76, 32.02], // 初始坐标
              [118.84, 32.32],
              [118.92, 32.22],
              [118.81, 32.12],
              [118.76, 32.02] // 结束坐标
            ]
          }
        }
      });

      // 添加轨迹图层
      map.addLayer({
        'id': 'trace-layer',
        'type': 'line',
        'source': 'trace',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#3887ff',
          'line-width': 5
        }
      });
      // 初始化当前索引
      var index = 0;

      // 播放轨迹的函数
      function playTrace() {
        if (index < 10) { // 假设有10个坐标点
          map.getSource('trace').setData({
            'type': 'LineString',
            'coordinates': [
              // ...其他坐标点
              [index, index] // 当前索引对应的坐标点
            ]
          });
          console.log("播放：", index);
          index++;
          setTimeout(playTrace, 100); // 每100毫秒更新一次
        }
      }

      // 开始播放
      playTrace();
    });
  },
};
</script>
