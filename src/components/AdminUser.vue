<template>
  <div style="padding-top: 10px; padding-left: 10px;  display: inline-block; font-size: 24px;">
    <b-badge
      variant="primary"
      style="text-align: left; "
      sizes= "lg"
    >
      {{ username }}
     <!--  <div style="max-width: 600px; display: inline-block; padding-left: 100px">
       <multiselect
          :value="value"
          @input="$emit('input', $event)"
          :options="options"
          :close-on-select="false"
          :show-labels="false"
          placeholder="User roles here"
          :multiple="true"
        >
        </multiselect>
      </div> -->
      <div style="display: inline-block; padding-left: 125px">
        <b-icon
          icon="three-dots-vertical"
          animation="fade"
          @click="say('something')"
          font-scale="2"
        ></b-icon>
      </div>
    </b-badge>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
export default {
  props: {
    value:{
      type: Array,
      required: true
    },
    username:{
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    say: function (message) {
      alert(message);
    },
  },
};
</script>