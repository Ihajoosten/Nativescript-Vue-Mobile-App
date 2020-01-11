<template>
  <Page  xmlns:Card="@nstudio/nativescript-cardview">
    <ActionBar>
      <Label text="Home"></Label>
    </ActionBar>

      <ScrollView>
        <StackLayout horizontalAlignment="center">
          <Label class="head" text=" Uren"></Label>
          <WorkedHoursComponent
            v-for="hour of hours"
            v-bind:key="hour"
            :hour="hour"
          />
        </StackLayout>
      </ScrollView>

  </Page>
</template>

<script>
import WorkedHoursComponent from '../Worked-hours/WorkedHoursComponent';

export default {
    components: {
    WorkedHoursComponent
  },
  props: ['token'],
  data: () => {
    return {
      message: 'Dit is de Home pagina',
      hours: []
    };
  },
  mounted() {
    this.hours = this.workedHours.slice(0, 5);
  },
  computed: {
    workedHours() {
      return this.$store.state.checkIn.workedHours;
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'checkIn/setWorkedHours') {
        this.hours = state.checkIn.workedHours.slice(0, 5);
      }
    });
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #34444e;
  color: #ffffff;
  font-size: 20px;
}

.head{
  font-size:24px;
  text-align: left;
  margin: 10px;
  margin-bottom: 5px;
  color: #676A6C;
}
</style>
