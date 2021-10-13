<template>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Commande En Heures</th>
          <th>Commande En Actes</th>
          <th>Planifier en Heures</th>
          <th>Capa En Actes</th>
          <th>Couverture En Heure</th>
          <th>Couverture En Acte</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(Day, Index) in Previsions"
          :key="Index"
          :class="
            totalCapaActesInDay(Day.Day) / parseFloat(Day.Commande) > 1
              ? 'table-success'
              : 'table-danger'
          "
        >
          <td>{{ Day.Day }}</td>
          <td>
            {{ parseFloat(Day.CommandeHours).toFixed(0) }}
          </td>
          <td>{{ parseFloat(Day.Commande).toFixed(0) }}</td>
          <td>
            {{
              isNaN(parseFloat(TdbData.planifieParJour[Index]))
                ? 0
                : parseFloat(TdbData.planifieParJour[Index])
            }}
          </td>
          <td>
            {{ totalCapaActesInDay(Day.Day) }}
          </td>
          <td>
            {{
              isNaN(parseFloat(TdbData.planifieParJour[Index]))
                ? parseFloat(0).toFixed(1)
                : (
                    (parseFloat(TdbData.planifieParJour[Index]) /
                      parseFloat(Day.CommandeHours)) *
                    100
                  ).toFixed(1)
            }}%
          </td>
          <td>
            {{
              (
                (totalCapaActesInDay(Day.Day) / parseFloat(Day.Commande)) *
                100
              ).toFixed(2)
            }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dash",
  computed: mapGetters([
    "Previsions",
    "TdbData",
    "ProdLocal",
    "CapaActesPlanifieParJour",
  ]),
  methods: {
    totalCapaActesInDay(Day) {
      if (this.CapaActesPlanifieParJour.length == 0) {
        return 0;
      } else {
        return this.CapaActesPlanifieParJour.find(
          (DayInWeek) => DayInWeek.Day == Day
        )
          .Capa.reduce(function (sum, SiteData) {
            return { Capa: sum.Capa + SiteData.Capa };
          })
          .Capa.toFixed(1);
      }
    },
  },
};
</script>

<style>
</style>