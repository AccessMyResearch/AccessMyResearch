<template>
    <b-card no-body class="lightTable-card">
        <b-card-header class="border-1" style = "height: 80px;">
            <span>
                <!-- <dropdown title="Most Recent" items="options1" style="text-align:left; float:left;"/> -->
                <CustomSelect
                    :options="['Most Recent', 'Most Citied', 'Most Discussed', 'Trending']"
                    :default="'Most Recent'"
                    Selector="Sort by: "
                    Icon="fas fa-chevron-down"
                    class="select my-select"
                    style="text-align:left; float:left; "
                    @input="alert(displayToKey($event))"/>
                <span style="text-align:right; float:right; font-family:Roboto; font-size: 16px;" class="form-text text-muted">in {{this.$store.state.search.timeElapsed}} seconds</span>
                <span class="text-muted d-flex justify-content-center" style="font-family:Roboto; font-size: 16px;"> {{ formattedResultsString }} </span>
            </span>  
              
            <br/>
            <span style="position:relative; top:-25px;">
               <CustomSelect
                    :options="['25', '50', '100', '150']"
                    :default="String(resultsPerPage)"
                    Selector="Results per page: "
                    Icon="fas fa-chevron-down"
                    class="select my-select-2 size-sm"
                    style="text-align:left; float:left;"
                    @input="setResultsPerPage($event)"/>
                <CustomSelect
                    :options="['Mini ', 'Compact ', 'Expanded ']"
                    :default="'Compact '"
                    Icon="fas fa-expand-arrows-alt"
                    class="select my-select-2 size-sm"
                    style="text-align:right; float:right; "
                    @input="alert(displayToKey($event))"/>
               <b-pagination
                  v-model="currentPage"
                  :per-page="10"
                  :total-rows="100"
                  first-text="First"
                  prev-text="Prev"
                  next-text="Next"
                  last-text="Last"
                  size="sm"
                  style="float:left; padding-left:350px;"
              />
           </span>
        </b-card-header>
        <div style="height: 77vh">
        <splitpanes class="default-theme">
        <pane class="scroll">
          <el-table
              class="table-responsive table-light"
              :data="tableContents"
              :row-style="tableRowStyle"
              :show-header="false"
              :cell-style="{ padding: '0', height: '12px' }"
              size="small"
              style="width: 100%;"
          >
            <el-table-column type="expand">
              <template v-slot="{ row }">
                <!--TODO: Indicate the availability of an article <p > Status:
                        <span class="font-weight-700 name mb-0 text-blue">{{row.status}}</span>
                        <span style="float:right">{{row.date}}</span>
                    </p> -->
                <!--<span style="float:right">{{row.date}}</span>-->
                <div
                    style="font-family:Roboto; font-size: 17px; font-weight: 400; padding-bottom:0px; position:relative; top:-15px; margin-bottom:-25px;"
                >
                  <span class="text-black">{{ row.description }}</span>
                </div>
                <b-modal
                    id="modal"
                    title="Add article to Collection"
                >
                  <!--TODO: Move this modal to separate function-->
                  <b-list-group>
                    <button class="btn btn-primary">Artificial Intelligence Collection</button>
                    <button class="btn btn-primary">Articles about electricity</button>
                    <button class="btn btn-primary">My favorites</button>
                    <button class="btn btn-light">Create new Collection</button>
                  </b-list-group>
                </b-modal>
              </template>
            </el-table-column>
            <el-table-column prop="name">
              <template v-slot="{ row }">
                <b-media
                    no-body
                    class="align-items-center"
                    style="padding-top: 8px"
                >
                  <b-media-body>
										<span
                        style="font-family:Roboto; font-size: 18px; "
                        class="font-weight-400 name mb-0"
                    ><v-clamp autoresize :max-lines="1">{{ row.database + " : " + row.title }}</v-clamp></span
                    >
                  </b-media-body>
                </b-media>
                <b-media
                    no-body
                    class="align-items-center"
                    style="position: relative; top:-10px; margin-bottom: -10px;"
                >
                  <!--<a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>-->
                  <p class="font-weight-400 name mb-0 text-blue" style="font-family:Roboto; font-size: 16px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    {{ row.authors === undefined ? "No author(s)" : row.authors.join(", ") }}</p>
                  <pre> </pre>
                  <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"> &#8211;
                    {{ row.journal === undefined ? "" : row.journal }}</p>
                  <pre> </pre>
                  <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px; white-space: nowrap;"> &#8211;
                    ({{ formatDate(row.datePublished) }})</p>

                  <!--TODO: Add ratings <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span> -->
                    </b-media>
                    <span class="button-options border-0" style="padding-left: 10px; position: relative; top:-5px; margin-bottom: -20px;">
                        <button @click="onPdfViewClick(row)" title="View" :disabled="!downloadAvailable(row)"
                                :class="{selectedButton: row === currSelectedArticle && showPDFViewer}"
                                class="far fa-eye fa-lg button-options"></button>
                        <button title="Download" :disabled="true" class="fas fa-file-download fa-lg button-options"></button>
                        <button title="Links" class="fas fa-external-link-alt fa-lg button-options"></button>
                        <button @click="onGetEmail(row)" title="E-Mail" class="fas fa-envelope fa-lg button-options"/>
                        <button title="Collections" v-b-modal.modal class="fas fa-layer-group fa-lg button-options"></button>
                        <button title="Cite" class="fas fa-quote-left fa-lg button-options"></button>
<!--                                :class="[!downloadAvailable(row) ? 'disabled-button': 'enabled-button']"-->
                     </span>
              </template>
            </el-table-column>
          </el-table>
        </pane>
        <pane v-if="showPDFViewer" class="scroll">
          <template>
            <CustomPDF v-bind:currSelectedArticle="currSelectedArticle"></CustomPDF>
          </template>
        </pane>
      </splitpanes>
    </div>
  </b-card>
</template>
<script>
import {Table, TableColumn} from "element-ui";
import Dropdown from "../../components/Dropdown.vue";
import CustomSelect from "../../components/CustomSelect.vue";
import CustomPDF from "../../components/CustomPDF.vue";
import {Splitpanes, Pane} from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import pdf from "vue-pdf";
import VClamp from 'vue-clamp';
import * as esRequestor from "@/util/elasticsearch-requestor";
import axios from "axios";
import { messaging } from 'firebase';

export default {
  name: "light-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    //Dropdown,
    CustomSelect,
    CustomPDF,
    Splitpanes,
    Pane,
    VClamp
  },
  props: {
    tableContents: Array,
  },
  computed: {
    resultsPerPage: {
      get: function () {
        return this.$store.state.search.resultsPerPage;
      },
      set: function (newResultsPerPage) {
        this.$store.state.search.resultsPerPage = parseInt(newResultsPerPage);
      }
    },
    currentPage: {
      get: function () {
        return this.$store.state.search.pageNum;
      },
      set: function (newPageNumber) {
        this.$store.state.search.pageNum = newPageNumber;
      }
    },
    formattedResultsString: function() {
        if (this.tableContents.length === 0) {
          return `0 of ${this.$store.state.search.totalResults} results`;
        }

        const startPosition = (this.currentPage - 1) * this.resultsPerPage + 1;
        const endPosition = startPosition + this.tableContents.length - 1;

        return `${startPosition}-${endPosition} of ${this.$store.state.search.totalResults} results`

    }
  },
  watch: {
    tableContents: function (newVal, oldVal) {
      // For debugging purposes
      // console.log("New table contents:");
      // console.dir(newVal);
    },
    currentPage: function (newVal, oldVal) {
      this.$store.state.search.pageNum = newVal;


      esRequestor.requestPage(this.$store.state.search).then(((searchResults) => {
        this.$store.state.articles = searchResults.articles;
        this.$store.state.search.totalResults = searchResults.totalResults;
        this.$store.state.search.timeElapsed = searchResults.timeElapsed;
      }).bind(this));
    }

  },
    data() {
        return {
            showPDFViewer: false,
            currSelectedArticle: undefined,
            options1: [
              {
                title: "Most Recent",
                link: "#",
              },
              {
                title: "Most Citied",
                link: "#",
              },
            ],
           
            placement:'down',
            selected: {text: "Most Recent", value: "most-recent"},
            options: [
                {
                text: "c",
                value: "most-recent",
                link: '#'
                },
                {
                text: "Most Cited",
                value: "most-cited",
                link: '#'
                },
                {
                text: "Most Discussed",
                value: "most-discussed",
                link: '#'
                },
                {
                text: "Most Rated",
                value: "most-rated",
                link: '#'
                },
                {
                text: "Highest Rated",
                value: "highest-rated",
                link: '#'
                },
                {
                text: "Trending",
                value: "trending",
                link: '#'
                },
                {
                text: "Expertise",
                value: "expertise",
                link: '#'
                },
            ]
        };
    },
    methods: {
      setResultsPerPage(newResultsPerPage) {
        this.$store.state.search.resultsPerPage = parseInt(newResultsPerPage);
        if (this.$store.state.search.query === "")
          return;

        // Update the table since the user changed how they want to view the data
        esRequestor.requestPage(this.$store.state.search).then(((searchResults) => {
          this.$store.state.articles = searchResults.articles;
          this.$store.state.search.totalResults = searchResults.totalResults;
          this.$store.state.search.timeElapsed = searchResults.timeElapsed;
        }).bind(this));
      },
      methodToRunOnSelect(payload) {
        this.object = payload;
      },
      formatDate(d) {
        try {
          let date = new Date(d);
          let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
          let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
          let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
          return `${year}`;
        }
        catch(err) {
          return "No date";
        }
      },
      onPdfViewClick(selectedArticle) {
        if (this.currSelectedArticle === selectedArticle) {
          this.currSelectedArticle = undefined;
          this.showPDFViewer = false;
          return;
        }
        this.currSelectedArticle = selectedArticle;
        this.showPDFViewer = true;
      },
      onGetEmail(selectedArticle) {
        if (selectedArticle.doi === undefined) {
          alert("Could not find a doi for the article")
        }
        this.searchStatus = 'Getting email from publisher...'
        axios.get(this.$endpoints.aspnet + 'doi/' + selectedArticle.doi)
            .then(function (response) {
              if (response) {
                if(response.status === 200){
                  window.open("mailto:" + response.data);
                }
                else {
                  alert("Could not find an email!");
                }
              }
            })
            .catch(function (error) {
              if(error.response && error.response.data){
                alert("Could not find an email!");
              }
            })
            .then(function(){
              //this.searchStatus = '';
            });

      },
      downloadAvailable: function(article) {
        if (article.url=== undefined || article.url === null)
          return false;

        for (let i = 0; i < article.url.length; i ++) {
          if (article.url[i] !== undefined && article.url[i] !== null && article.url[i].endsWith(".pdf"))
            return true;
        }

        return false;
      }
    },
    mounted() {
      this.resultsPerPage = 25;
    },
}
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.right {
  width: 15%;
  margin-left: auto;
  float: right;
}

.bForms {
  border: 0px;
  width: 250px;
}

.my-select {
  max-width: 210px;
  height: 15px;
}

.my-select-2 {
  max-width: 210px;
}

.scroll {
  overflow-y: scroll;
}

.lightTable-card{
    box-shadow: 0 3px 5px #8898AA; 
    margin-left:15px;
    display: flex;
}

.btn-group button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

.button-options {
  width: 20px;
  border: 0px;
  background-color: inherit;
  padding: 10px 45px 10px 0px;
  color: #4577b8;
}

.button-options :hover {
  color: #f78626;
}

/*.button-options :focus {*/
/*  color: #f78626;*/
/*  border: 0px;*/
/*}*/

.button-options :active {
  border: 0px;
}

.selectedButton {
  color: #f78626;
}

.button-options :disabled {
  color: grey;
}

</style>
