<template>
  <GridComponent
    :width="300"
    :height="300"
    :points="points"
    :pointRadius="5"
   />
</template>

<script>
import GridComponent from "./GridComponent.vue";

export default {
  name: "GridLayout",
  components: {
    GridComponent,
  },
  data() {
    return {
      points: [
        { x: 120, y: 20, color: "#0898" },
        { x: 190, y: 270, color: "#00ff00" },
        { x: 90, y: 30, color: "#0000ff" },
        { x: 90, y: 80, color: "#ff00ff" },
      ],
    };
  },
};
</script>