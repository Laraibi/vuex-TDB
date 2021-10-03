<template>
  <div class="row">
    <div class="col-3">
      <label for="selectedProject" class="form-label">Projet:</label>
      <input
        class="form-control d-inline"
        list="selectedProjectOptions"
        id="selectedProject"
        placeholder="Type to search..."
        @change="changeSelectedProjectID"
        v-model="selectedProjectId"
      />
      <datalist id="selectedProjectOptions">
        <option
          v-for="(Project, index) in Projects"
          :key="index"
          :value="Project.FullName"
        >
          {{ Project.FullName }}
        </option>
      </datalist>
    </div>
    <div class="col-3">
      <label for="weekStr" class="form-label">Semaine:</label>
      <input
        class="form-control d-inline"
        list="weekStrOptions"
        id="weekStr"
        placeholder="Type to search..."
        @change="changeSelectedWeekStr"
        v-model="weekStr"
      />
      <datalist id="weekStrOptions">
        <option value="S36-2021">S36-2021</option>
        <option value="S37-2021">S37-2021</option>
        <option value="S38-2021">S38-2021</option>
        <option value="S39-2021">S39-2021</option>
        <option value="S40-2021">S40-2021</option>
        <option value="S41-2021">S41-2021</option>
      </datalist>
    </div>
    <div class="col-3">
        <label for="scenario">Scenario:</label>
      <select
        @change="changeSelectedScenario"
        v-model="scenario"
        name="scenario"
        class="form-control d-inline"
        id="scenario"
      >
        <option value="RP">Planification</option>
        <option value="IDP">Pilotage</option>
      </select>
    </div>
    <div class="col-3">
      <button class="btn btn-success" @click="updatePrevisions">Get TDB</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "tdbForm",
  data() {
    return {
      selectedProjectId: "",
      weekStr: "",
      scenario: "",
    };
  },
  computed: mapGetters(["Projects"]),
  methods: {
    changeSelectedProjectID() {
      this.$store.dispatch("changeSelectedProject", this.selectedProjectId);
    },
    changeSelectedWeekStr() {
      this.$store.dispatch("changeSelectedWeekStr", this.weekStr);
    },
    changeSelectedScenario() {
      this.$store.dispatch("changeSelectedScenario", this.scenario);
    },
    updatePrevisions() {
      this.$store.dispatch("getForcastInWeekOfProject");
      this.$store.dispatch("getRoadMapData");
    },
  },
  created() {
    this.$store.dispatch("getProjects");
  },
};
</script>

<style>
</style>