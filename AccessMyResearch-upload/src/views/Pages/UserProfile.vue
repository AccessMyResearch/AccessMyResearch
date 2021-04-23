<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-primary opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello {{ user.firstName }}</h1>
              <p class="text-white mt-0 mb-5">
                This is your profile page. Here, you can edit what people see on
                your profile. Add some of your hobbies and interests to stand
                out.
              </p>
              <a href="#!" class="btn btn-info">Edit profile</a>
              <b-button
                type="submit"
                variant="primary"
                class="btn btn-info"
                to="interests"
                >Edit Fields of Interest</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="12" class="order-xl-1">
          <b-card>
            <div class="mb-0">Active Roles: </div>
            <b-button
              v-for="role in user.roles" :key="role"
              style="display: inline-block;"
              variant="primary"
              disabled
            >
              {{ role }}
            </b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <user-card></user-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { Auth, AuthHelperRoles } from "@/util/auth-helper.js";
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";

export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  data() {
    return {
      data: "",
      user: {
        company: "AccessMyResearch",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        education: "",
        city: "",
        country: "",
        state: "",
        aboutMe: "",
        expertise: "",
        university: "",
        roles: [],
      },
    };
  },
  computed: {
    signedIn(){
      return this.$store.state.signedIn;
    }
  },
  async mounted() {
    await this.getUserData();
  },
  methods: {
    async getUserData() {
      var user = await Auth.currentAuthenticatedUser();

      for (const [key, value] of Object.entries(user.storage)) { //gets the profile information of the current User stored in Cognito
        if(value.substring(0, 15) == "{\"UserAttribute")
        {
          this.data = value;
          break ;
        }
      }

      const { attributes } = user;
      this.user.firstName = attributes["custom:first_name"];

      this.user.roles = AuthHelperRoles.getUserRoles(user);
    },
  },
};
</script>