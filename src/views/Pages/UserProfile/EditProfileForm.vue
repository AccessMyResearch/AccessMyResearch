<template>
<card>
  <b-row align-v="center" slot="header" >
    <b-col cols="8">
      <h3 class="mb-0">Edit profile </h3>
    </b-col>
    <b-col cols="4" class="text-right">
      <a href="#!" class="btn btn-sm btn-primary">Settings</a>
    </b-col>
  </b-row>

  <b-form @submit.prevent="updateProfile">
    <h6 class="heading-small text-muted mb-4">User information</h6>

    <div class="pl-lg-4">
      <b-row>
        <b-col lg="6">
          <base-input
            type="text"
            label="Username"
            placeholder="Jesse_Jones2"
            v-model="user.username"
            disabled
          >
          </base-input>
        </b-col>
        <b-col lg="6">
          <base-input
            type="email"
            label="Email address"
            placeholder="example@email.com"
            v-model="user.email"
          >
          </base-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col lg="6">
          <base-input
            type="text"
            label="First Name"
            placeholder="First Name"
            v-model="user.firstName"
          >
          </base-input>
        </b-col>
        <b-col lg="6">
          <base-input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            v-model="user.lastName"
          >
          </base-input>
        </b-col>
      </b-row>
    </div>
    <hr class="my-4">

    <!-- Address -->
    <h6 class="heading-small text-muted mb-4">Contact information</h6>

    <div class="pl-lg-4">
      <b-row>
        <b-col md="12">
          <base-input
            type="text"
            label="Address"
            placeholder="Home Address"
            v-model="user.address"
          >
          </base-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <base-input
            type="text"
            label="City"
            placeholder="City"
            v-model="user.city"
          >
          </base-input>
        </b-col>
        <b-col lg="4">
          <base-input
            type="text"
            label="Country"
            placeholder="Country"
            v-model="user.country"
          >
          </base-input>
        </b-col>
        <b-col lg="4">
          <base-input
            label="Postal Code"
            placeholder="ZIP Code"
            v-model="user.postalCode"
          >
          </base-input>
        </b-col>
      </b-row>
    </div>

    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Overview</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="A few words about you." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>


    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Education</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="Your past and current education." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>

    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Statistic</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="Some helpful statistic." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>

    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Grant Information</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="Information about your grants." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>


    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Publication</h6>
    <div>
      <b-table 
        hover
        responsive
        :items="publications.data"
        :fields="publications.fields"
        sticky-header
        head-variant="light"
      >
      <template v-slot:cell(doi)="data">
        <a :href="`http://${data.value}`">{{ data.value }}</a>
      </template>
      </b-table>
    </div>

  </b-form>
</card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        company: 'Access My Research',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: 'Richardson',
        country: 'United States',
        postalCode: '',
        aboutMe: ``
      },
      publications: {
        fields: [
          {
            key: 'title',
            sortable: true,
            label: 'Title'
          },
          {
            key: 'date',
            sortable: true,
            label: 'Date Published',
            formatter: (dateObj) => `${(dateObj.month + 1)}/${dateObj.day}/${dateObj.year}`
          },
          {
            key: 'doi',
            sortable: false,
            label: 'DOI Link'
          }
        ],
        data: []
      }
    };
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user)); //TODO: Remove test alert
    }
  },
  mounted: function(){
    var self = this;

    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', 'https://localhost:5001/api/publications');

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function() {
      if (xhr.status === 200) { // analyze HTTP status of the response
        var response = xhr.response;
        var json = JSON.parse(response);
        self.publications.data = json;
      }
    };

    xhr.onerror = function() {
      console.error("Request failed.");
    };
  }
};
</script>