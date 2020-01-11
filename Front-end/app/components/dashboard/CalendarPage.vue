<template>
  <Page>
    <ActionBar>
      <Label text="Kalender"></Label>
    </ActionBar>

    <StackLayout horizontalAlignment="center">
      <ScrollView>
        <StackLayout horizontalAlignment="center">
          <WorkedHoursComponent
                  v-for="hour of hours"
                  v-bind:key="hour"
                  :hour="hour"
          />
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
  import WorkedHoursComponent from "../Worked-hours/WorkedHoursComponent";


  export default {
    components: {
      WorkedHoursComponent
    },
    props: ["token"],
    data: () => {
      return {
        message: "Dit is de Kalender pagina",
        hours: []
      };
    },
    mounted() {
      this.hours = this.workedHours;
    },
    computed: {
      workedHours() {
        return this.$store.state.checkIn.workedHours;
      }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'checkIn/setWorkedHours') {
          this.hours = state.checkIn.workedHours;
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
</style>
