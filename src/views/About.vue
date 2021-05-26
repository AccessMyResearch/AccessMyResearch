<template>
  <div class="SearchDropDown">
      <base-header
      class="pb-5 pt-md-3 bg-gradient-primary"
    ></base-header>
    <b-card-group deck>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1 firstFilter" role="tab">
          <b-button
              block
              v-b-toggle.SortByAccordion
              squared variant="#4577B8"
              class="dropdownButton"
          >
            <div> About<span><i></i></span></div>
          </b-button
          >
        </b-card-header>
       
      </b-card>
      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            type="button"
            @click="currentTabComponent = 'Declaration', tabClick()"
            squared variant="outline-primary"
            class="dropdownButton toggleBg"
            style="max-width:600px; $accordion-button-active-bg: #4577B8;"
          >
            <div>AMR Declaration<span><i v-if="fillTab" background-color="#4577B8;" style="max-width:220px;"></i></span></div>
          </b-button
          >
        </b-card-header>
      </b-card>


      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            type="button"
            @click="currentTabComponent = 'Mission'"
            squared variant="outline-primary"
            class="dropdownButton toggleBg"
          >
            <div>Mission<span><i style="max-width:220px;"></i></span></div>
          </b-button
          >
        </b-card-header>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            type="button"
            @click="currentTabComponent = 'Partner'"
            v-on:click="fillTab = true"
            squared variant="outline-primary"
            class="dropdownButton toggleBg"
          >
            <div>Partners<span><i v-if="fillTab" style="max-width:220px;"></i></span></div>
          </b-button
          >
        </b-card-header>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;" ref="donationBox">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            type="button"
            @click="currentTabComponent = 'AMRnews'"
            squared variant="outline-primary"
            class="dropdownButton toggleBg"
          >
            <div>AMR News<span><i style="max-width:220px;"></i></span></div>
          </b-button
          >
        </b-card-header>
      </b-card>

       <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            type="button"
            @click="currentTabComponent = 'OAnews'"
            squared variant="outline-primary"
            class="dropdownButton toggleBg"
          >
            <div>OA News<span><i style="max-width:220px;"></i></span></div>
          </b-button
          >
        </b-card-header>
      </b-card>

      
    </div>
        <component v-bind:is="currentTabComponent" style="padding-top: 20px; width: 1100px;"></component>
    </b-card-group>
  </div>
</template>
<script>

import LightTable from "./Tables/LightTable";
import Declaration from "./AboutTabs/Declaration.vue";
import Mission from "./AboutTabs/Mission.vue";
import OAnews from "./AboutTabs/OAnews.vue";
import Partner from "./AboutTabs/Partner.vue";
import AMRnews from "./AboutTabs/AMRnews.vue";


export default {
  components: {
    LightTable,
    Declaration: Declaration,
    Mission: Mission,
    Partner: Partner,
    AMRnews: AMRnews,
    OAnews: OAnews,
  },
  data() {
    return {
      modal: false,
      fillTab: false,
      currentTabComponent: "About",
    };
  },
  methods: {
    //default filter start
    defaultFilterCheckboxChecked() {
      localStorage.selectedFilters = this.selectedFilters;
      localStorage.yearRange = this.yearRange;
      localStorage.defaultFilterCheckbox = this.defaultFilterCheckbox;

      if (localStorage.defaultFilterCheckbox == "true") {
        localStorage.clear();
        return;
      }
    },
    formatYear(d) {
      try {
        let date = new Date(d)
        let year = new Intl.DateTimeFormat('en', { year: 'numeric', day: "numeric" }).format(date);
        return parseInt(year);
      }
      catch(err) {
        return undefined;
      }
    },
    tabClick() {
    if (this.currentTabComponent === currentTabComponent) {
        this.fillTab = true;
        return;
     }
    },
  }
}
</script>
<style scoped>
.dropdownButton {
  text-align: left;
  border: 0px;
  font-size: 16px;
  width: 220px;


}
.accordion {
    padding-left: 40px;
    padding-top: 20px;
}

.toggleBg.not-collapsed {
  background-color: #4577B8;
  color: white;
}

.downArrow {
  float: right;
  padding-top: 3px;
}

.collapseAccordion {
  column-count: 1;
}

.firstFilter {
  background-color: #F78626;
}

.settingsAccordion{
    background-color:#F78626;
}

.donationBox{
    background-color:gray;
}

.fillTab{
    background-color: #4577B8;
}

.accordion-toggle{
    background-color: #4577B8;
    color:white;
}
</style>