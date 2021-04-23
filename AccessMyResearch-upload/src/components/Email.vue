<template>
  <b-modal
    id="EmailModal" 
    size="xl" 
    title="Email" 
    ok-title="Send" 
    v-model="show"
    @ok="submitEmailForm"
  > 
    <div>
      <multiselect
        v-model="to"
        :options="emails"
        :multiple="true"
        :close-on-select="false"
        :preserve-search="true"
        placeholder="Choose Emails"
        :preselect-first="true"
        class="form-pad"
      >
      </multiselect>

      <input
        type="text"
        v-model="subject"
        class="form-control form-pad"
        placeholder="Subject"
      />
      <textarea
        type="text"
        v-model="body"
        class="form-control form-pad"
        placeholder=""
        rows="7"
      ></textarea>
    </div>
  </b-modal>
</template>

<script>
import Multiselect from 'vue-multiselect';
import axios from "axios";

export default {
  props: ["emails"],
  components: {
    Multiselect
  },
  data() {
    return {
      show: false,
      to: [],
      subject: "",
      body: "\n\n\n\n\nSent from AccessMyResearch (AMR)",
    };
  },
  methods: {
    showModal: function(){
      this.show = true;
    },
    submitEmailForm: function(){
      this.$ga.event('registered', 'email-author');
      const formData = new FormData();
      formData.append('to', this.to);
      formData.append('subject', this.subject);
      formData.append('body', this.body);

      axios.post(this.$endpoints.aspnet + "email", formData)
        .then(function (response){
          console.log("ASPNET API EMAIL RESPONSE:")
          console.log(response);
        })
        .catch(function (error){
          console.log("ASPNET API EMAIL ERROR:")
          console.log(error);
        });
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.interest-tab {
  display: inline-block;
  padding-left: 10px;
}

.form-pad {
  margin-bottom: 20px;
}
</style>