<template>
  <svg class="wrapper" :width="width" :height="height">
    <line
      v-for="(line, index) in pointLines"
      :key="'line-' + index"
      :x1="line.x1"
      :y1="line.y1"
      :x2="line.x2"
      :y2="line.y2"
      :stroke="line.color"
      stroke-width="2"
    />
    <circle
      v-for="(point, index) in transformedPoints"
      :key="'point-' + index"
      :cx="point.x"
      :cy="point.y"
      :r="pointRadius"
      :fill="point.color"
    />
  </svg>
</template>

<script>
export default {
  name: "GridComponent",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    points: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(
          (point) =>
            typeof point.x === "number" &&
            typeof point.y === "number" &&
            typeof point.color === "string"
        );
      },
    },
    pointRadius: {
      type: Number,
      required: true,
    },
  },
  computed: {
    transformedPoints() {
      return this.points.map((point) => ({
        x: point.x,
        y: this.height - point.y,
        color: point.color,
      }));
    },
    pointLines() {
      return this.transformedPoints
        .slice(1)
        .map((point, index) => ({
          x1: this.transformedPoints[index].x,
          y1: this.transformedPoints[index].y,
          x2: point.x,
          y2: point.y,
          color: point.color,
        }));
    },
  },
};
</script>

<style scoped>
  .wrapper {
    background-color: #f9f9f9;
    border: 1px solid grey
  }
</style>
