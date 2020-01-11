<template>
  <Page class="body" actionBarHidden="true">
    <Image
          src="~/assets/images/nos-managementapp-logo.png"
          class="logo"
        />
  </Page>
</template>

<script>
import Dashboard from './dashboard/Dashboard';
import * as Toast from 'nativescript-toast';
import LoginPage from './login/LoginPage';
import axios from 'axios';
import { getString } from 'tns-core-modules/application-settings';

export default {
  components: {
    Dashboard
  },
  data() {
    return {
      domains: []
    };
  },
  methods: {
    goToLogin() {
      this.$navigateTo(LoginPage, {
        clearHistory: true,
        transition: {
          name: 'fade',
          duration: 400
        },
        props: {
          domains: this.domains
        }
      });
    },
      goToDashboard() {
          this.$navigateTo(Dashboard, {
              clearHistory: true,
              transition: {
                  name: 'fade',
                  duration: 400
              }
          });
      }
  },
  mounted() {
      if ( getString('store') && getString('store') != "") {
          this.$store.commit('auth/load');
          setTimeout(() => {
              this.goToDashboard();
          }, 2000);
      } else {
          axios
              .get('https://nostrapersoneelsapi.herokuapp.com/api/company/domains')
              .then(
                  res => {
                      res.data.result.forEach(domain => {
                          this.domains.push(domain.Domain);
                      })

                      setTimeout(() => {
                          this.goToLogin();
                      }, 1500);
                  },
                  error => {
                      Toast.makeText("Kon geen verbinding maken met API").show();
                  }
              );
      }

  }
};
</script>

<style scoped>
.body {
  background-image: url('~/assets/images/SplashScreen.jpg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.logo {
  margin: 50px;
}
</style>
