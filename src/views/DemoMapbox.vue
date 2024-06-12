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

      // 撒点并弹框
      let points = [
        { coordinates: [118.76, 32.02], },
        { coordinates: [118.86, 32.12], },
        { coordinates: [118.96, 32.12], },
        { coordinates: [118.78, 32.04], },
      ]
      this.$refs.CtpMapboxRef.addPointLayer('testLayer', points, e => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
          )
          .addTo(map);
      })

      // 绘制多边形  draw

      // 轨迹播放
      this.$refs.CtpMapboxRef.addTraceLayer('testLayer2', [
        [118.76, 32.02],
        [118.86, 32.12],
        [118.96, 32.12],
        [118.78, 32.04],
      ])

      // 删除图层
      // this.$refs.CtpMapboxRef.removeLayer('testLayer');
    });
  },
};
</script>
