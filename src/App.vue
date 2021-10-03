<template>
  <div class="container">
    <tdb-form></tdb-form>
    <div class="row">
      <div class="col-6">
        <dash />
      </div>
      <div class="col-6">
        <road-map-data></road-map-data>
      </div>
    </div>
  </div>
</template>

<script>
import tdbForm from "./components/tdbForm.vue";
import dash from "./components/dash.vue";
import roadMapData from "./components/roadMapData.vue";
export default {
  name: "App",
  components: {
    tdbForm,
    dash,
    roadMapData,
  },
  computed: {},
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
