<template>
  <div class="container">
    <div v-if="loading">
      <h1>loading</h1>
    </div>
    <tdb-form></tdb-form>
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <dash />
      </div>
      <div class="col-md-12 col-lg-4">
        <road-map-data class="m-2"></road-map-data>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-3">
        <details-by-site title="Capa Planifie en Actes Par Site" field="Capa"/>
      </div>
      <div class="col-md-6 col-lg-3">
        <details-by-site title="Capa Planifie en Heure Par Site" field="Capaheures"/>
      </div>
      <div class="col-md-6 col-lg-3">
        <!-- Calculate the Capa Engeagemtn on the Store -->
        <details-by-site title="Capa Engaement en Heure Par Site" field="CapaEng"/>
      </div>
      <div class="col-md-6 col-lg-3">
        <!-- Calculate the Capa Engeagemtn on the Store -->
        <details-by-site title="Capa Engaement en Heure Par Site" field="CapaEng"/>
      </div>
    </div>
  </div>
</template>

<script>
import tdbForm from "./components/tdbForm.vue";
import dash from "./components/dash.vue";
import detailsBySite from "./components/detailsBySite.vue";
import roadMapData from "./components/roadMapData.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    tdbForm,
    dash,
    roadMapData,
    detailsBySite
  },
  computed: mapGetters(["loading"]),
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
.table {
  font-size: small;
  font-weight: lighter;
}
</style>
