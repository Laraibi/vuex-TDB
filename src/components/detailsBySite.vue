<template>
  <div class="">
    <h6>{{ title }}</h6>
    <table class="table">
      <thead>
        <tr>
          <th>Sites</th>
          <th v-for="(site, index) in sitesNames" :key="index">
            {{ site }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Day, Index) in dataTable" :key="Index">
          <th>{{ Day.DateDay }}</th>
          <td v-for="(Site, Index) in Day.data" :key="Index">
            {{ parseFloat(Site.data).toFixed(1) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "detailsBySite",
  props: {
    title: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      default: "Capa",
    },
  },
  computed: {
    ...mapGetters(["CapaActesPlanifieParJour"]),
    sitesNames() {
      let names = [];
      names = this.CapaActesPlanifieParJour.map((day) =>
        day.Capa.map((Site) => Site.Site)
      );
      names = [...new Set(names.flat())];
      return names;
    },
    dataTable() {
      let data = [];
      data = this.CapaActesPlanifieParJour.map((Day) => ({
        DateDay: Day.Day,
        data: Day.Capa.map((dataInDay) => ({
          SiteName: dataInDay.Site,
          data: dataInDay[this.field],
        })),
      }));
      return data;
    },
  },
};
</script>

<style>
th{
    font-size: x-small;
}
</style>