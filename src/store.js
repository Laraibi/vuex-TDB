import { createStore } from "vuex";
import axios from "axios";
import moment from "moment";

export const store = createStore({
  state: {
    Projects: {},
    selectedProjectId: -1,
    WeekStr: "",
    Scenario: "",
    CommandeInWeek: {},
    dataRoadMap: {},
    planifieParJour: {},
    loading: false,
  },
  getters: {
    loading: (state) => {
      return state.loading;
    },
    Projects: (state) => {
      return state.Projects;
    },
    Previsions: (state, getters) => {
      return state.CommandeInWeek.length > 0
        ? state.CommandeInWeek.map((element) => ({
            ...element,
            CommandeHours:
              parseFloat(element.Commande) / getters.TdbData.ProdClient,
          }))
        : {};
    },
    CapasData: (state) => {
      return state.dataRoadMap;
    },
    ProdLocal: (state, getters) => {
      return Object.keys(state.dataRoadMap).length > 0
        ? getters.TdbData.CapaActeGlobalSites /
            getters.TdbData.CapaHeureGlobalSites
        : 0;
    },
    AbsOFDayInSite: (state) => (siteName, day) => {
      if (!state.dataRoadMap.length > 0) {
        return 0;
      }
      let SiteData = state.dataRoadMap.find(
        (CapaSite) => CapaSite.Site == siteName
      );
      if ([0, 6].includes(moment(day).day())) {
        return parseFloat(SiteData.AbsWE) / 100;
      } else {
        return parseFloat(SiteData.Abs);
      }
    },
    CapaActesPlanifieParJour: (state, getters) => {
      let CapaByDay = Object.keys(state.planifieParJour).map((Day) => {
        return {
          Day: Day,
          Capa: Object.keys(state.planifieParJour[Day]).map((Site) => {
            return {
              Site: Site,
              Prod: getters.CapasData.find((CapaSite) => CapaSite.Site == Site)
                .Prod,
              Abs: getters.AbsOFDayInSite(Site, Day),
              Capaheures:
                Object.keys(state.planifieParJour[Day]).length > 0
                  ? parseFloat(state.planifieParJour[Day][Site])
                  : 0,
              Capa:
                parseFloat(state.planifieParJour[Day][Site]) *
                parseFloat(
                  getters.CapasData.find((CapaSite) => CapaSite.Site == Site)
                    .Prod
                ) *
                (1 - getters.AbsOFDayInSite(Site, Day)),
            };
          }),
        };
      });
      return CapaByDay;
    },
    totalPlanifieBySiteInWeek: (state, getters) => {
      if (Object.keys(state.planifieParJour).length > 0) {
        let data = getters.CapaActesPlanifieParJour.map((Day) => Day.Capa);
        let newData = [];
        data.forEach((Day) => {
          Day.forEach((Site) => {
            newData.push({
              SiteName: Site.Site,
              CapaActes: Site.Capa,
              CapaHeures: Site.Capaheures,
            });
          });
        });
        let uniquesSitesNames = [
          ...new Set(newData.map((element) => element.SiteName)),
        ];
        let totalPlanifieBySite = uniquesSitesNames.map((Site) => ({
          SiteName: Site,
          CapaHeures: newData
            .filter((element) => element.SiteName == Site)
            .reduce((sum, element) => ({
              CapaHeures: sum.CapaHeures + element.CapaHeures,
            })).CapaHeures,
          CapaActes: newData
            .filter((element) => element.SiteName == Site)
            .reduce((sum, element) => ({
              CapaActes: sum.CapaActes + element.CapaActes,
            })).CapaActes,
        }));
        return totalPlanifieBySite;
      } else {
        return [];
      }
    },
    TdbData: (state) => {
      return {
        ProdClient:
          Object.keys(state.dataRoadMap).length > 0
            ? state.dataRoadMap[0].ProdClient
            : 0,
        planifieParJour: Object.keys(state.planifieParJour).map((element) => {
          return Object.values(state.planifieParJour[element]).length > 0
            ? Object.values(state.planifieParJour[element]).reduce(
                (a, b) => a + b
              )
            : 0;
        }),
        CapaActeGlobalSites:
          Object.keys(state.dataRoadMap).length > 0
            ? Object.values(state.dataRoadMap).reduce(function(sum, value) {
                return {
                  CapaActe:
                    parseFloat(sum.CapaActe) + parseFloat(value.CapaActe),
                };
              }).CapaActe
            : 0,
        CapaHeureGlobalSites:
          Object.keys(state.dataRoadMap).length > 0
            ? Object.values(state.dataRoadMap).reduce(function(sum, value) {
                return {
                  CapaHeure:
                    parseFloat(sum.CapaHeure) + parseFloat(value.CapaHeure),
                };
              }).CapaHeure
            : 0,
      };
    },
  },
  actions: {
    getProjects({ commit }) {
      commit("set_loading", true);
      axios
        .get("http://127.0.0.1:8000/api/ProjectsList", {
          params: { vuejs: "" },
        })
        .then((response) => {
          commit("set_loading", false);
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
      commit("set_loading", true);
      axios
        .get("http://127.0.0.1:8000/api/CommandeInWeek", {
          params: {
            vuejs: "",
            ProjectFullName: state.selectedProjectId,
            WeekStr: state.WeekStr,
          },
        })
        .then((response) => {
          commit("set_loading", false);
          commit("set_previsions", response.data);
        });
    },
    getRoadMapData({ commit, state }) {
      commit("set_loading", true);
      axios
        .get("http://127.0.0.1:8000/api/CapasData", {
          params: {
            vuejs: "",
            ProjectFullName: state.selectedProjectId,
            WeekStr: state.WeekStr,
          },
        })
        .then((response) => {
          commit("set_loading", false);
          commit("set_roadMapData", response.data);
        });
    },
    getSumHoursScheduledByDayAndSiteInWeek({ commit, state }) {
      commit("set_loading", true);
      axios
        .get("http://127.0.0.1:8000/api/SumHoursScheduledByDayAndSiteInWeek", {
          params: {
            vuejs: "",
            ProjectFullName: state.selectedProjectId,
            WeekStr: state.WeekStr,
          },
        })
        .then((response) => {
          commit("set_loading", false);
          commit("set_planifieParJour", response.data);
        });
    },
    launchReset({ commit }) {
      commit("reset_state");
    },
    changeLoadingValue({ commit }, value) {
      commit("set_loading", value);
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
    set_planifieParJour(state, data) {
      state.planifieParJour = data;
    },
    set_loading(state, value) {
      state.loading = value;
    },
    reset_state(state) {
      state.CommandeInWeek = {};
      state.dataRoadMap = {};
      state.planifieParJour = {};
    },
  },
});
