<template>
  <div>
    <base-header class="pb-8 pt-md-8 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </div>
    </card>
    <b-card-footer class="py-4 d-flex justify-content-end">
      <!--TODO: Make these buttons change table contents-->
        <base-pagination
            v-model="currentPage"
            :per-page="10"
            :total="25">
        </base-pagination>
    </b-card-footer>
  </div>
</template>
<script>
export default {
  data() {
    return { //TODO: Use actual schema
      fields: [
        {
          key: "project_name",
          sortable: true,
        },
        {
          key: "add_user",
          sortable: false,
        },
        {
          key: "add_collection",
          sortable: false,
        },
        {
          key: "view_content",
          sortable: false,
        },
        {
          key: "edit",
          variant: "danger",
        },
        {
          key: "share",
          sortable: false,
        },
      ],
      items: [
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
        {
          project_name: "Biology",
          add_user: "O",
          add_collection: "O",
          view_content: "O",
          edit: "O",
          share: "O",
        },
      ],
    };
  },
};
</script>