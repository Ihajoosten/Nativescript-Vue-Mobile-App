import * as Toast from "nativescript-toast";
import axios from "axios";

const account = {
  namespaced: true,
  state: {
    employee: {}
  },
  actions: {
    fetchEmployee({ state, commit }, token) {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/employee", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 200) {
            commit("setEmployee", res.data.result[0]);
          }
        })
        .catch(err => {
          Toast.makeText(
            "Error: kon de werknemer gegevens niet ophalen"
          ).show();
        });
    },
  },
  mutations: {
    setEmployee(state, employee) {
      employee.BirthDate = new Date(employee.BirthDate);
      state.employee = employee;
    }
  }
};

export default account;
