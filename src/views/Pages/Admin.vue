<template>
  <div>
    <base-header
      class="pb-5 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <div class="col-lg mx-auto form p-4">
      <el-table :data="users">
        <el-table-column prop="username" label="Username" sortable>
        </el-table-column>
        <el-table-column label="Roles">
          <template v-slot="{ row }">
            <b-icon icon="eye-fill" font-scale="2" @click="getRole(row.username)"/>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="" width="135">
          <b-icon icon="trash-fill" font-scale="2" v-b-modal.deleteUserModal/>
        </el-table-column> -->
      </el-table>

      <b-modal
        v-model="showRole"
        id="userRoleModal"
        :title="currentUser.username"
        ok-title="Confirm"
        @ok="saveRoles()"
      >
        Role:
        <multiselect v-model="currentUserRoles.roles" :options="roles" :multiple="true">
        </multiselect>
      </b-modal>

      <!-- <b-modal
        id="deleteUserModal"
        title="Delete user"
        ok-title="Delete"
      >
        Are you sure you want to delete x?</b-modal
      > -->
    </div>
  </div>
</template>

<script>
import { Auth, AuthHelperAxios, AuthHelperRoles } from "@/util/auth-helper.js";
import axios from "axios";
import AdminUser from "@/components/AdminUser.vue";
import { Table, TableColumn, Input } from "element-ui";
import Multiselect from "vue-multiselect";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Multiselect,
    [Input.name]: Input,
  },
  data: function () {
    return {
      users: [],
      currentUser: {},
      currentUserRoles: {
        roles: [],
        nativeGroups: [],
      },
      roles: AuthHelperRoles.userRoles,
      showRole: false,
    };
  },
  mounted: function () {
    this.loadUsers();
  },
  methods: {
    loadUsers: async function () {
      let options = {};
      await AuthHelperAxios.attachAuthenticationHeader(options);

      //Get the list of registered users from the ASP backend API.
      axios
        .get(this.$endpoints.aspnet + "admin/list-users", options)
        .then((res) => {
          let data = res.data;
          let users = [];

          for (let i = 0; i < data.users.length; i++) {
            users.push({
              username: data.users[i].username,
            });
          }

          this.users = users;
        })
        .catch(console.log);
    },
    getRole: async function (username) {
      let options = {
          params:{
              username: username
          }
      };
      await AuthHelperAxios.attachAuthenticationHeader(options);
      
      //Since the backend API can only load a list of a particular user's groups one at a time,
      // we only get a user's groups when they are specificly clicked on as opposed to page load.
      // This request gets the list of AWS Cognito groups that a user is in and converts them to roles for display.
      axios
        .get(this.$endpoints.aspnet + "admin/get-user", options)
        .then((res) => {
          let user = res.data;

          this.currentUserRoles = AuthHelperRoles.translateGroupsToRoles(user.groups);

          this.currentUser = user;
          this.showRole = true;
        })
        .catch(console.log);
    },
    saveRoles: async function () {
      let options = {};
      await AuthHelperAxios.attachAuthenticationHeader(options);

      let request = {
        username: this.currentUser.username,
        groups: AuthHelperRoles.translateRolesToGroups(
          this.currentUserRoles.roles,
          this.currentUserRoles.nativeGroups
        ),
      };

      //Sets a user's AWS Cognito groups to reflect the changes to their website roles made by the active admin.
      axios
        .post(this.$endpoints.aspnet + "admin/user-groups-save", request, options)
        .catch(console.log);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>