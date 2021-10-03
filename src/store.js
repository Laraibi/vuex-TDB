import { createStore } from "vuex";
import axios from "axios";
export const store = createStore({
  state: {
    Projects: {},
    selectedProjectId: -1,
    WeekStr: "",
    Scenario: "",
    CommandeInWeek: {},
    dataRoadMap: {},
  },
  getters: {
    Projects: (state) => {
      return state.Projects;
    },
    Previsions: (state) => {
      return state.CommandeInWeek;
    },
    CapasData: (state) => {
      return state.dataRoadMap;
    },
  },
  actions: {
    getProjects({ commit }) {
      axios
        .get("http://127.0.0.1:8000/api/ProjectsList", {
          params: { vuejs: "" },
        })
        .then((response) => {
          commit("set_projects", response.data);
        });
    },
    changeSelectedProject({ commit }, newId) {
      commit("set_selected_project_id", newId);
    },
    changeSelectedWeekStr({ commit }, newWeekStr) {
      commit("set_Selected_Week_Str", newWeekStr);
    },
    changeSelectedScenario({ commit }, newScenario) {
      commit("set_Selected_Scenario", newScenario);
    },

    getForcastInWeekOfProject({ commit, state }) {
      axios
        .get("http://127.0.0.1:8000/api/CommandeInWeek", {
          params: {
            vuejs: "",
            ProjectFullName: state.selectedProjectId,
            WeekStr: state.WeekStr,
          },
        })
        .then((response) => {
          commit("set_previsions", response.data);
        });
    },
    getRoadMapData({ commit, state }) {
      axios
        .get("http://127.0.0.1:8000/api/CapasData", {
          params: {
            vuejs: "",
            ProjectFullName: state.selectedProjectId,
            WeekStr: state.WeekStr,
          },
        })
        .then((response) => {
          commit("set_roadMapData", response.data);
        });
    },
  },
  mutations: {
    set_projects(state, Projects) {
      state.Projects = Projects;
    },
    set_selected_project_id(state, id) {
      state.selectedProjectId = id;
    },
    set_Selected_Week_Str(state, newWeekStr) {
      state.WeekStr = newWeekStr;
    },
    set_Selected_Scenario(state, newScenario) {
      state.Scenario = newScenario;
    },
    set_previsions(state, previsions) {
      state.CommandeInWeek = previsions;
    },
    set_roadMapData(state, data) {
      state.dataRoadMap = data;
    },
  },
});
