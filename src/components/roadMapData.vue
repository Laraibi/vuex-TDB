<template>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th>Sites</th>
          <th>Capacitaire Acte</th>
          <th>Capacitaire Heure</th>
          <th>% ABS</th>
          <th>% ABS WeekEnd</th>
          <th>Prod réelle</th>
          <th>Prod Client</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Site, Index) in CapasData" :key="Index">
          <th>{{ Site.Site }}</th>
          <td>{{ parseFloat(Site.CapaActe).toFixed(1) }}</td>
          <td>{{ parseFloat(Site.CapaHeure).toFixed(1) }}</td>
          <td>{{ Site.Abs * 100 }}%</td>
          <td>{{ Site.AbsWE }}%</td>
          <td>{{ parseFloat(Site.Prod).toFixed(2) }}</td>
          <td>{{ parseFloat(Site.ProdClient).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "roadMapData",
  computed: mapGetters(["CapasData", "AbsOFDayInSite"]),
};
</script>

<style>
</style>