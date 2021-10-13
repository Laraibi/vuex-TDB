<template>
  <div class="row">
    <div class="col-4">
      <div class="row">
        <label for="selectedProject" class="col-6 col-form-label form-label"
          >Projet:</label
        >
        <div class="col-6">
          <input
            class="form-control"
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
      </div>
    </div>
    <div class="col-3">
      <div class="row">
        <label for="weekStr" class="form-label col-6 col-form-label"
          >Semaine:</label
        >
        <div class="col-6">
          <input
            class="form-control"
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
      </div>
    </div>
    <div class="col-3">
      <button class="btn w-50 btn-success" @click="updatePrevisions">Get TDB</button>
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
      this.$store.dispatch("launchReset");
      this.$store.dispatch("getForcastInWeekOfProject");
      this.$store.dispatch("getRoadMapData");
      this.$store.dispatch("getSumHoursScheduledByDayAndSiteInWeek");
    },
  },
  mounted() {
    this.$store.dispatch("getProjects");
    this.selectedProjectId = "SFR N1 Tech FTTH AE";
    this.weekStr = "S39-2021";
    this.$store.dispatch("changeSelectedProject", this.selectedProjectId);
    this.$store.dispatch("changeSelectedWeekStr", this.weekStr);
  },
};
</script>

<style>
</style>