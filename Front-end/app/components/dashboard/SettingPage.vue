<template>
  <Page>
    <ActionBar>
      <Label text="Settings"></Label>
    </ActionBar>

    <StackLayout>
      <card-view class="card" elevation="10" radius="5">
        <GridLayout rows="auto" class="form">

          <GridLayout columns="*, auto" row="1">
            <button class="logOutBtn" v-on:tap="onLogout()">Uitloggen</button>
            
          </GridLayout>
        </GridLayout>
      </card-view>
    </StackLayout>
  </Page>
</template>

<script>
import LoginPage from '../login/LoginPage';
import startScreen from '../App';
import axios from 'axios';

export default {
  data() {
    return {
      domains: []
    };
  },
  methods: {
    test() {
this.$navigateTo(startScreen, {
                        clearHistory: true,
                            transition: {
                              name: 'fade',
                              duration: 400
                            }
                          });
    },
    onLogout() {
      this.$store.dispatch('auth/logoutUser');
      axios
              .get('https://nostrapersoneelsapi.herokuapp.com/api/company/domains')
              .then(
                  res => {
                      res.data.result.forEach(domain => {
                          this.domains.push(domain.Domain);
                      })
                        
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
                  error => {
                      Toast.makeText("Kon geen verbinding maken met API").show();
                  }
              );
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #34444e;
  color: #fff;
  font-size: 20px;
}

.head {
  font-size: 24px;
  text-align: left;
  margin: 10px;
  margin-bottom: 5px;
  color: #676a6c;
}

.form {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
}

.card {
  width: 95%;
  margin: 25px 20px;
}

.locationLabel {
  color: #676a6c;
  font-size: 15px;
  padding-left: 9px;
}

.logOutBtn {
  margin-top: 30px;
  background-color: #da534f;
  color: #fff;
}
</style>
