<template>
  <div>
    <base-header
      class="pb-5 pt-md-3 bg-gradient-primary"
    ></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <button
            type="button"
            class="btn"
            @click="currentTabComponent = 'Account'"
          >
            Acount
          </button>
          <button
            type="button"
            class="btn"
            @click="currentTabComponent = 'Privacy'"
          >
            Privacy
          </button>
          <button
            type=" button"
            class="btn"
            @click="currentTabComponent = 'Display'"
          >
            Display
          </button>
          <button
            type=" button"
            class="btn"
            @click="currentTabComponent = 'Payment'"
          >
            Payment
          </button>
          <button
            type=" button"
            class="btn"
            @click="currentTabComponent = 'Security'"
          >
            Security
          </button>
          <button
            type=" button"
            class="btn"
            @click="currentTabComponent = 'Localization'"
          >
            Localization
          </button>
          <button
            type=" button"
            class="btn"
            @click="currentTabComponent = 'ManageIgnoredUsers'"
          >
            Manage Ignored Users
          </button>
          <!--  <p> {{currentTabComponent}} </p> -->
          <component v-bind:is="currentTabComponent"></component>
          <!-- <p> This will be the settings page</p> -->
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import ManageIgnoredUsersTab from "@/components/Settings/ManageIgnoredUsersTab";
import Account from "./SettingsTabs/Account.vue";
import Privacy from "./SettingsTabs/Privacy.vue";
import Security from "./SettingsTabs/Security.vue";
import Display from "./SettingsTabs/Display.vue";
import Payment from "./SettingsTabs/Payment.vue";
import Localization from "./SettingsTabs/Localization.vue";

export default {
  components: {
    Account: Account,
    Privacy: Privacy,
    Security: Security,
    Display: Display,
    Payment: Payment,
    Localization: Localization,
    ManageIgnoredUsers: ManageIgnoredUsersTab,
  },
  data() {
    return {
      currentTabComponent: "Account",
    };
  },
};
</script>