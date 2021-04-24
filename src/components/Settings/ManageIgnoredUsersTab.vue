<template>
  <b-list-group style="max-width: 400px">
    <b-list-group-item
      v-for="(user, index) in model.ignoredUsers"
      :key="user.name"
    >
      <div>
        <div class="float-left v-center">
          {{ user.name }}
        </div>
        <b-button
          title="Un-ignore user"
          size="sm"
          variant="grey"
          class="float-right"
          @mouseover="user.iconHover = true"
          @mouseleave="user.iconHover = false"
          @click="unIgnoreUser(index)"
        >
          <b-icon
            :icon="getUnignoreIcon(user.iconHover)"
            font-scale="2"
            aria-hidden="true"
            ><span class="sr-only">Un-ignore user</span></b-icon
          >
        </b-button>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  data: function () {
    return {
      model: {
        ignoredUsers: [
          {
            name: "Samuel",
            iconHover: false,
          },
          {
            name: "AJ",
            iconHover: false,
          },
        ],
      },
    };
  },
  methods: {
    getUnignoreIcon: function (hover) {
      return hover ? "eye" : "eye-slash";
    },
    unIgnoreUser: function (indexInList) {
      this.model.ignoredUsers.splice(indexInList, 1);
    },
  },
};
</script>
<style scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}

div.v-center {
  padding: 5px 0px;
}
</style>