<template>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Commande En Actes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Day, Index) in Previsions" :key="Index">
          <td>{{ Day.Day }}</td>
          <td>{{ parseFloat(Day.Commande).toFixed(0) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dash",
  computed: mapGetters(["Previsions"]),
};
</script>

<style>
</style>