<template>
  <div>
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
    <b-container fluid class="pt-2">
      <!-- <b-row>
        <b-col sm="6">
          <filter-panel/>
        </b-col>
        <b-col>
            <light-table/>
        </b-col>
      </b-row> -->

      <b-card-group deck>
        <filter-panel/>
        <light-table/>
      </b-card-group>  
    </b-container>
  </div>
</template>
<script>
  import FilterPanel from '@/components/FilterPanel.vue'; //TODO: Add filter panel
  import LightTable from './Tables/LightTable';
  import { Auth } from 'aws-amplify';
  import { AmplifyEventBus } from 'aws-amplify-vue';

  

  export default {
    created() {
      this.findUser();

      AmplifyEventBus.$on('authState', info => {
        if(info === 'signedIn') {
          this.findUser();
        } else {
          this.$store.state.signedIn = false;
          this.$store.state.user = null;
        }
      });
    },
    components: {
      LightTable,
      FilterPanel

    },
    methods: {
      async findUser() 
      {
        try {
          const user = await Auth.currentAuthenticatedUser();
          this.$store.state.signedIn = true;
          this.$store.state.user = user;
        }
        catch(err){
          this.$store.state.signedIn = false;
          this.$store.state.user = null;
        }
      }
    }
  };
</script>
<style>
.el-table.table-dark{
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr{
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf{
  border-bottom: none;
}
</style>