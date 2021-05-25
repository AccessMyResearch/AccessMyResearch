<template>
  <div>
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <button type="button" class="btn" @click="currentTabComponent ='Messages'" >Messages</button>
          <button type="button" class="btn" @click="currentTabComponent ='Updates'" >Updates</button>
          <button type="button" class="btn" @click="currentTabComponent ='Requests'" >Requests</button>
          <!--  <p> {{currentTabComponent}} </p> -->
          <component v-bind:is ="currentTabComponent" ></component>
          <!-- <p> This will be the settings page</p> -->
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import Messages from './Messages'
import Updates from './Updates.vue';
import Requests from './Requests.vue';

export default {
  components:{
    'Messages': Messages,
    'Updates': Updates,
    'Requests': Requests,
  },
  data() {
    return {
      currentTabComponent:""
    };
  },
};
</script>