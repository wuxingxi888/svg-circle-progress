<script setup lang="ts">
import SvgCirclePro from './components/SvgCirclePro/index.vue'
</script>
<template>
  <svg-circle-pro class="aaa" :rate="r" bg-ring-color="rgba(244,74,122,0.2)" ring-color="rgba(244,74,122,0.9)"
    center-color="background: radial-gradient(rgba(255,255,255,0.2) 0%, rgba(254,236,242,0.44) 30%, #FCC3D7 100%)"
    stroke-linecap="butt" :stroke-width="20" :part="90" :part-gap="10">
    <span>
      <span>{{ `${(r * 100).toFixed(2)}%` }}</span>
      <br />
    </span>
  </svg-circle-pro>
</template>

<script lang="ts">
export default {
  components: {
    SvgCirclePro,
  },
  data() {
    return {
      r: 0.9,
    };
  },
};
</script>
<style>
.aaa {
  width: 150px !important;
  height: 150px !important;
}
</style>