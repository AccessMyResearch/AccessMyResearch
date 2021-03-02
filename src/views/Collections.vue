<template>
  <div>
    <base-header class="pb-8 pt-md-8 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </div>
    </card>
    <b-card-footer class="py-4 d-flex justify-content-end">
      <!--TODO: Make these buttons change taable contents-->
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
    return {
      fields: [
        {
          key: "article",
          sortable: true,
        },
        {
          key: "author",
          sortable: false,
        },
        {
          key: "date_published",
          sortable: false,
        },
        {
          key: "edit",
          sortable: false,
          variant: "danger",
        },
        {
          key: "share",
          sortable: false,
        },
      ],
      items: [
        {
          article: "Continuous demixing transition of binary liquids: finite-size scaling from the analysis of sub-systems",
          author: "Spencer Balog",
          date_published: "10/10/2020",
          edit: "O",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Investigating institutional influence on graduate program admissions by modelling physics GRE cut-off scores",
          author: "Mehmet Gunal",
          date_published: "01/16/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "John von Neumann's 1950s Change to Philosopher of Computation",
          author: "Austin Taylor",
          date_published: "7/19/2000",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Precise phase control of large-scale inorganic perovskites via vapor-phase anion-exchange strategy",
          author: "Caleb Hoff",
          date_published: "10/14/1999",
          edit: "O",
          share: "O",
        },
        {
          article: "Continuous demixing transition of binary liquids: finite-size scaling from the analysis of sub-systems",
          author: "Spencer Balog",
          date_published: "10/10/2020",
          edit: "O",
          share: "O",
        },
        {
          article: "Continuous demixing transition of binary liquids: finite-size scaling from the analysis of sub-systems",
          author: "Spencer Balog",
          date_published: "10/10/2020",
          edit: "O",
          share: "O",
        },
        {
          article: "Continuous demixing transition of binary liquids: finite-size scaling from the analysis of sub-systems",
          author: "Spencer Balog",
          date_published: "10/10/2020",
          edit: "O",
          share: "O",
        },
        {
          article: "Continuous demixing transition of binary liquids: finite-size scaling from the analysis of sub-systems",
          author: "Spencer Balog",
          date_published: "10/10/2020",
          edit: "O",
          share: "O",
        },
      ],
    };
  },
};
</script>