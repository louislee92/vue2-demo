
// 线样式
const lineColor = '#ca6924';   // 线样式
const lineDasharray = [2,2];  // dash间隙
const lineWidth = 2;    // 线宽度

// 区域样式
const fillColor = '#ca6924';    // 区域样式
const fillOutlineColor = '#ff0000';   // 边线样式
const fillOpacity = 0.1;      // 区域透明度

// 边界点样式
const polygonMidPointsColor = 'red';
const polygonMidPointsWidth = 5;


export default [
  // line stroke
  {
    "id": "gl-draw-line-inactive",
    "type": "line",
    "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": '#00ff00',
      "line-dasharray": lineDasharray,
      "line-width": lineWidth
    }
  },
  // ACTIVE (being drawn)   激活状态样式
  // line stroke  线样式
  {
    "id": "gl-draw-line",
    "type": "line",
    "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": lineColor,
      "line-dasharray": lineDasharray,
      "line-width": lineWidth
    }
  },
  // polygon fill
  {
    "id": "gl-draw-polygon-fill",
    "type": "fill",
    "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    "paint": {
      "fill-color": fillColor,
      "fill-outline-color": fillOutlineColor,
      "line-width": lineWidth,
      "fill-opacity": fillOpacity
    }
  },
  // polygon mid points
  {
    'id': 'gl-draw-polygon-midpoint',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'midpoint']],
    'paint': {
      'circle-radius': polygonMidPointsWidth,
      'circle-color': polygonMidPointsColor
    }
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    "id": "gl-draw-polygon-stroke-active",
    "type": "line",
    "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#D20C0C",
      "line-dasharray": [2, 2],
      "line-width": 2
    }
  },
  // vertex point halos
  {
    "id": "gl-draw-polygon-and-line-vertex-halo-active",
    "type": "circle",
    "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
    "paint": {
      "circle-radius": 5,
      "circle-color": "#FFF"
    }
  },
  // vertex points
  {
    "id": "gl-draw-polygon-and-line-vertex-active",
    "type": "circle",
    "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
    "paint": {
      "circle-radius": 10,
      "circle-color": "#D20C0C",
    }
  },

  // INACTIVE (static, already drawn)   非激活状态样式
  // polygon fill
  {
    "id": "gl-draw-polygon-fill-inactive",
    "type": "fill",
    "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    "paint": {
      "fill-color": "#000",
      "fill-outline-color": "#000",
      "fill-opacity": 0.1
    }
  },
  // polygon outline
  {
    "id": "gl-draw-polygon-stroke-inactive",
    "type": "line",
    "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#000",
      "line-width": 3
    }
  }
]
