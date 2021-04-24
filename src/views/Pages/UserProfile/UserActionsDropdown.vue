<template>
<div class="action-dropdown-container">
    <b-dropdown size="sm" variant="primary" right style="float: right;" class="m-2" no-caret>
        <template v-slot:button-content>
            <b-icon icon="three-dots" font-scale="2" aria-hidden="true"><span class="sr-only">Actions</span></b-icon>
        </template>
        <b-dropdown-item-button @click="onIgnoreUser">
            Ignore User
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="onBanUser">
            Ban User
        </b-dropdown-item-button>
        <b-dropdown-item-button variant="red" @click="onReportUser">
            Report User
        </b-dropdown-item-button>
    </b-dropdown>
</div>
</template>

<script>
export default {
    methods: {
        onIgnoreUser: function(event){
            alert("Ignored user!");
        },
        onBanUser: function(event){
            alert("Banned user!");
        },
        onReportUser: function(event){
            alert("Reported user!");
        }
    }
};
</script>

<style scoped>
  .action-dropdown-container >>> .dropdown-toggle::after {
    content: none;
  }
</style>