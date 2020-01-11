<template>
  <ScrollView>
    <StackLayout>
      <card-view class="card" elevation="10" radius="5">
        <GridLayout rows="auto, auto, auto, auto" class="form">
          <StackLayout row="1">
            <Image
              v-if="employee.Photo && employee.Photo.data"
              stretch="fill"
              class="image"
              :src="photo()"
            />
            <label class="welcomeText" text="Goedemiddag Robin!" />
          </StackLayout>
          <StackLayout row="2">
            <Button col="1" class="checkOutBtn" @tap="onCheckOutTap"
              >Uitklokken</Button
            >
          </StackLayout>
          <StackLayout class="buttons" orientation="horizontal" row="3">
            <Button v-on:tap="goToPauseScreen" col="1" class="breakBtn"
              >Pauze</Button
            >
            <Button :isEnabled="false" col="1" class="changeBtn"
              >Wisselen</Button
            >
          </StackLayout>
        </GridLayout>
      </card-view>
    </StackLayout>
  </ScrollView>
</template>

<script>
import * as Toast from "nativescript-toast";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as geolocation from "nativescript-geolocation";
const test = require("base64-arraybuffer");

export default {
  props: ["token", "branchId", "departmentId", "isPausedIn"],
  data() {
    return {
      form: {
        fetchedLatitude: "",
        fetchedLongitude: ""
      },
      employee: {},
      count: 0,
      checkOutStatus: 0,
      endTime: null
    };
  },
  methods: {
    goToPauseScreen() {
      if (this.isPausedIn) {
        this.$emit("onPauseTap", true);
      } else {
        this.$emit("onPauseTap", false);
      }
    },
    photo() {
      var photo =
        "data:image/jpg;base64," + test.encode(this.employee.Photo.data);
      return photo;
    },
    getEmployee() {
      return (this.employee = this.$store.state.account.employee);
    },
    getLocation() {
      geolocation
        .getCurrentLocation({
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 20000
        })
        .then(res => {
          this.form.fetchedLatitude = res.latitude;
          this.form.fetchedLongitude = res.longitude;
        })
        .catch(err => {
          Toast.makeText(err.message).show();
        });
    },
    onCheckOutTap() {
      const date = new Date(Date.now());
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      this.endTime = date.getHours() + ":" + minutes;

      if (this.isPausedIn) {
        this.$store.dispatch("pause/addEndPause", this.endTime);
      }

      if (this.form.fetchedLatitude == "" || this.form.fetchedLongitude == "") {
        console.log('--------------------------- INVALID LATITUDE/LONGITUDE')
        // Toast.makeText("Zet je locatie aan om uit te klokken!").show();
        return;
      }

      const checkOutData = {
        endTime: this.endTime,
        branchId: this.branchId,
        departmentId: this.departmentId,
        latitude: this.form.fetchedLatitude,
        longitude: this.form.fetchedLongitude ,
        pause: this.$store.state.pause.pause
      };

      console.log('-------------------- CHECKOUT DATA -----------------------> ', checkOutData)

      this.$store.dispatch("checkIn/updateWorkedHours", {
        data: checkOutData,
        token: this.token
      });
    }
  },
  created() {
    this.getLocation();
    this.getEmployee();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "checkIn/setCheckOutStatus") {
        this.checkOutStatus = state.checkIn.checkOutStatus;
      }
    });
  },
  watch: {
    checkOutStatus: function(val, oldVal) {
      if (this.checkOutStatus === 200) {
        this.$emit("onCheckedOut", this.endTime);
      } else if (this.checkOutStatus === 400) {
        Toast.makeText("Ben je wel op de juiste locatie?");
      } else {
        Toast.makeText("Iets is er misgegaan met je request").show();
      }
    }
  }
};
</script>

<style scoped>
.image {
  font-size: 250px;
  color: #dddddd;
  text-align: center;
  border-radius: 200%;
  height: 270dip;
  width: 270dip;
  margin: 20dip;
}

.welcomeText {
  text-align: center;
  font-size: 20px;
  color: #676a6c;
  padding: 15 0;
}

.card {
  margin-top: 25px;
  width: 90%;
  margin-bottom: 30px;
}

label {
  color: #dddddd;
  font-size: 13px;
}

button {
  padding: 20;
}

.buttons {
  padding: 20;
}

button.checkOutBtn {
  height: 110px;
  border-radius: 10;
  width: 90%;
  background-color: #00a0d1;
  color: white;
}

button.breakBtn {
  height: 100px;
  width: 45%;
  background-color: #dddddd;
  color: #b3676a6c;
}

button.changeBtn {
  height: 100px;
  width: 45%;
  background-color: #dddddd;
  color: #b3676a6c;
}
</style>
