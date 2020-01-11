import axios from "axios";
import * as Toast from "nativescript-toast";
import { getString, setString } from "tns-core-modules/application-settings";

const auth = {
    namespaced: true,
    state: {
        token: null,
        user: null,
        isProcessing: true
    },
    actions: {
        getToken({ state, commit }, { token }) {
            commit('setToken', token);
            setString('store', JSON.stringify(state));
            return state.token;
        },
        loginUser({state, commit}, user) {
            axios
                .post('https://nostrapersoneelsapi.herokuapp.com/api/auth/login', user)
                .then((res) => {
                    if ( res.status === 200 ) {
                        commit('setUser', res.data.user);
                        commit('setToken', res.data.token);
                        setString('store', JSON.stringify(state));
                    } else {
                        Toast.makeText("Ongeldige gebruikersnaam of wachtwoord voor domein").show();
                        commit('setIsProcessing', false);
                    }
                })
                .catch((err) => {
                    Toast.makeText("Kon niet inloggen - server fout").show();
                });
        },
        logoutUser({ state, commit } ) {
            console.log('--------------------------- SETTING STORE TO NULL')
            setString('store', "");
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setIsProcessing(state, bool) {
            state.isProcessing = bool;
        },
        load(state) {
            if(getString("store")) {
                Object.assign(state, JSON.parse(getString('store')));

                console.log('to save state which is edited ---------------------> ', state,
                    state.token, state.user);
            }
        }
    }
}

export default auth;
