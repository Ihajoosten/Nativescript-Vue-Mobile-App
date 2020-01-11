import axios from "axios";
import Vue from "vue";
import * as Toast from "nativescript-toast";
import { ValueList } from "nativescript-drop-down";

const checkIn = {
  namespaced: true,
  state: {
    branchId: null,
    departmentId: null,
    workedHours: [],
    allBranchesWithDepartments: [],
    postCheckInStatus: 0,
    checkOutStatus: 0
  },
  actions: {
    getBranchIdAndDepartmentId({ state, commit }, { branchId, departmentId }) {
      commit("setBranchId", branchId);
      commit("setDepartmentId", departmentId);
      return state.branchId;
    },
    getAllBranchesAndDepartments({ state, commit }, token) {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/checkIn", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          commit("setBranchesWithDepartments", res.data.result);
        })
        .catch(err => {
          console.log('-------------------------------- COULD NOT GET WORKED HOURS')
          // Toast.makeText(
          //   "Error: kon de filialen en afdelingen niet ophalen"
          // ).show();
        });
    },
    postCheckIn({ state, commit }, { form, token }) {
      axios
        .post("https://nostrapersoneelsapi.herokuapp.com/api/checkIn", form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          commit("setPostCheckInStatus", res.status);
        })
        .catch(err => {
          Toast.makeText("Error: Kon niet inklokken").show();
        });
    },
    fetchAllWorkedHours({ state, commit }, token) {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/workedHours", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          commit("setWorkedHours", res.data.result);
        })
        .catch(err => {
          console.log('-------------------------------- COULD NOT GET WORKED HOURS')
          // Toast.makeText(
          //   "Error: de gewerkte uren konden niet worden opgehaald"
          // );
        });
    },
    updateWorkedHours({ state, commit }, { token, data }) {
      axios
        .patch("https://nostrapersoneelsapi.herokuapp.com/api/checkOut", data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          commit("setCheckOutStatus", res.status);
        })
        .catch(error => {
          Toast.makeText(error.message);
        });
    }
  },
  mutations: {
    setBranchId(state, bId) {
      state.branchId = bId;
    },
    setDepartmentId(state, dId) {
      state.departmentId = dId;
    },
    setWorkedHours(state, items) {
      state.workedHours = items;
    },
    setBranchesWithDepartments(state, items) {
      state.allBranchesWithDepartments = items;
    },
    setPostCheckInStatus(state, statusCode) {
      state.postCheckInStatus = statusCode;
    },
    setCheckOutStatus(state, statusCode) {
      state.checkOutStatus = statusCode;
    }
  }
};

export default checkIn;
