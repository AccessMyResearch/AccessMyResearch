<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <Email ref="doiEmailModal" :emails="emailModal.emailOpts"></Email>
    <b-card-header class="border-0">

      <h3 class="mb-0" >About {{results.length}} results ({{elapsed_time}} ms) </h3>

    </b-card-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">

          
          <!--  <b-table striped hover :items="results" :fields="fields"></b-table>  -->
          <el-table
            class="table-responsive table"
            header-row-class-name="thead-light"
            :data="results"
          >
            <el-table-column label="Title" min-width="300px" prop="name">
              <template v-slot="{ row }">
                <b-media no-body class="align-items-center">
                  <b-media-body>
                    <span class="font-weight-600 name mb-0 text-sm">{{
                      row._source.snippet
                    }}</span>
                  </b-media-body>
                </b-media>
              </template>
            </el-table-column>
            <el-table-column
              label="Author(s)"
              prop="_source.authors"
              min-width="150px"
            >
              <template v-slot="{ row }">
                {{ row._source.author }}
     
                  <div 
                    class="emailIcon"
                    @click="doiEmailIconClick(row._source.doi)"
                    v-if="row._source.isDoi"
                  >
                    <b-icon
                        icon="envelope-fill"
                        font-scale="2"
                        aria-hidden="true"
                        ><span class="sr-only">Email Author</span>
                    </b-icon>
                  </div>

              </template>
            </el-table-column>
            <el-table-column
              label="Description"
              prop="_source.description"
              min-width="350px"
            >
            </el-table-column>
            <el-table-column
              label="Date Published"
              prop="_source.datePublished"
              min-width="200px"
            >
            </el-table-column>
            <el-table-column
              label="URL"
              prop="_source.url"
              min-width="350px"
            >
            </el-table-column>
            <el-table-column
              label="DOI"
              prop="_source.doi"
              min-width="200px"
            >
            </el-table-column>
            <el-table-column
              label="View Count"
              prop="_source.count"
              min-width="200px"
              sortable
            >
            </el-table-column>
          </el-table> 
                <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.doajAccordion variant="primary"
                        >DOAJ: About {{results_doaj.length}} results ({{timeTotal}} ms)</b-button>
                    </b-card-header>
                    <b-collapse
                      id="doajAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                          <div v-for="(result, i) in results_doaj" :key="i + result.bibjson.title">
                            <p v-html="result.bibjson.title"></p>
                                <p>Published Date: {{result.created_date}}</p>
                                <p>Author: </p>
                                <p v-for="(author, ii) in result.bibjson.author" :key="ii + author.name">
                                  {{author.name}}
                                </p>
                                <p v-for="(link, iii) in result.bibjson.link" :key="iii + link.url"> 
                                  Link/URL: <a :href="link.url" target="_blank" @click="$ga.event('link', 'goto-external', link.url)">{{ link.url }}</a>
                                </p>
                                <p>Description/Abstract: {{result.bibjson.abstract}}</p>
                                <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
                          </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>

              
                <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.unpaywallAccordion variant="primary"
                        >DOI: About {{results_doi.length}} results ({{elapsed_time}} ms)</b-button>
                    </b-card-header>
                    <b-collapse
                      id="unpaywallAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                          <div v-for="(result, i) in results_doi" :key="i + result"><p v-html="result.snippet">
                            </p><a :href="result.response.doi_url">{{ result.response.doi_url}}</a>
                                <p> Published Date: 
                                  {{ publishedDate(result.response.published_date) }}
                                </p>
                                <p> Authors: 
                                  {{ commaSeparatedAuthors(result.response.z_authors) }}
                                </p>
                                <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
                          </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import LightTable from "./Tables/LightTable";
import { Client } from "elasticsearch";
import { Table, TableColumn } from "element-ui";
import axios from "axios";
import Email from '@/components/Email.vue';

const client = new Client({ node: "http://localhost:9600/" });

export default {
  components: {
    // LightTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Email
  },
  data() {
    return {
      results:[],
      results_doaj: [],
      results_doi: [],
      //fields: ['snippet', 'response.doi_url'],
      elapsed_time: 0,
      timeTotal: 0,
      blacklistText:"",
      lengthResults: 0,

      emailModal: {
        emailOpts: []
      }
    };
  },
  computed: {
    text() {
      // this.blacklistText = " ";
      //this.rawText = this.$route.query.text;
      //alert(this.rawText)
      var re = /(?:^|\s)(-[a-z0-9]\w*)/gi; // finding words starting with -
      var match;
      while ((match = re.exec(this.$route.query.text)) != null) {
        // this.blacklistText = this.blacklistText + " " + match[0].substring(2); //extracting filtered words
      }
      //alert(this.blacklistText)
      return this.$route.query.text || 1;
    },
    doiEndpoint(){
      return this.$endpoints.aspnet + "doi";
    },
  },
  watch: {
    async text() {
      this.timeTotal = 0;
      this.performSearch();
    },
  },
  mounted() {
    this.performSearch();
  },
  methods: {
    postSearchHistory(startTime, totalResults, queryText){
      const searchQuery = {};

      var queryTime = startTime.toDateString();
      searchQuery[startTime] =  JSON.stringify({ time: queryTime, total: totalResults, query: queryText });
      //searchQuery[queryTime] =  queryText;
      axios
      .post('http://localhost:3000/search', searchQuery)
      .then(function (response) {
         console.log(response);
      })
       .catch(function (error) {
          console.log(error);
       });
    },
    commaSeparatedAuthors(authorsList){
      if(authorsList == null){
        return "N/A"
      }
      else {
        let authorString = ""
        for (let index = 0; index < authorsList.length; index++) {
          authorString = `${authorString} ${authorsList[index].family} ${authorsList[index].given}, `;
        }
        return authorString.slice(0, -2);
      }
    },
    publishedDate(publishedDateList){
      if(publishedDateList == null){
        return "N/A"
      }
      else {
        return publishedDateList;
      }
    },

    async performSearch() {
       var startTime, endTime;
       this.results = [];
       this.lengthResults = 0; 
       startTime = new Date();

      axios
      .get(`https://doaj.org/api/v1/search/articles/${this.$route.query.text}?page=1&pageSize=100`)
      .then((response) => {
          //this.elapsed_time = response.data.elapsed_seconds
          this.results_doaj = response.data.results;
          this.lengthResults = response.data.total;
          console.log(this.lengthResults);
          //var numberResultsDate =  startTime + "; Number of Results " + this.lengthResults; 
          this.postSearchHistory(startTime,this.lengthResults, this.$route.query.text);
       });
    
      axios
      .get(`https://api.unpaywall.org/v2/search/?query=${this.$route.query.text}&email=your_email&is_oa=true`)
      .then((response) => {
          this.elapsed_time = response.data.elapsed_seconds;
          this.results_doi = response.data.results;
       });

      // searchQuery[startTime] = this.$route.query.text;

      // axios
      //   .post("http://localhost:3000/search", searchQuery)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });


      this.searchStatus = 'Searching AMR Database...';
      let searchResults = await client
        .search({
          body: {
            size: 100,
            query: {
              bool: {
                must_not: {
                  query_string: {
                    fields: [ "title", "authors", "description", "datePublished", "url", "doi"],
                    query: this.blacklistText,
                  },
                },
                should: {
                  query_string: {
                    fields: [ "title", "authors", "description", "datePublished", "url", "doi"],
                    query: this.$route.query.text,
                  },
                },
              },
            },
          },
        })
        .catch((e) => {
          console.log("AMR Results errored:", e);
        });

      this.searchStatus = '';

      endTime = new Date();
      var timeDiff = endTime - startTime;
      this.timeTotal = this.timeTotal + timeDiff;

      if(searchResults && searchResults.hits && searchResults.hits.hits){
        for(var hit of searchResults.hits.hits) {
          hit._source.authors = this.arrayToString(hit._source.authors);
          hit._source.url = this.arrayToString(hit._source.url);
          hit._source.description = this.shortenDescription(hit._source.description);
        }
        this.results.push(...searchResults.hits.hits);
      }

      //Subject to change - if Elasticsearch doesn't get any results from this search (i.e., we don't have anything about DOI in our data),
      // then check to see if there is a valid in the query string (e.g. 10.1510/12616/asghja/125)
      // If there is a valid DOI, check Crossref.org for some basic details (author name & article title).
      if (this.results.length === 0) {
        this.checkDoi();
      }
    },
    checkDoi() {
      var self = this;
      //Regex for matching DOIs.
      var reg = /10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i;
      var search = reg.exec(this.$route.query.text);
      if (search.length > 0) {
        //matched a doi in the string.
        this.searchStatus = 'Recognized DOI. Checking Crossref.org for info...';

        var doi = search[0]; //This is the first match for the regex. This currently only searches the first under the assumption that only one would be searched at a time...
        axios.get(this.$endpoints.crossref + 'works/' + doi) //sends a query to Crossref.org for basic article details like title and author.
          .then(function (response) {
            if (response && response.status === 200) {
              var newRow = {
                _source: {
                  snippet: response.data.message.title[0],
                  author: response.data.message.author[0].family + ", " + response.data.message.author[0].given,
                  isDoi: true,
                  doi: doi
                },
              };

              self.results.push(newRow);
            }
          })
          .catch(function (error) {
            alert("invalid or no doi result");
          })
          .then(function(){
            self.searchStatus = '';
          });
      }
    },
    doiEmailIconClick(doi){
      const self = this;

      this.searchStatus = 'Getting email from publisher...';
      axios.get(this.doiEndpoint + '/' + doi)
        .then(function (response) {
          if (response) {
            if(response.status === 200){
              self.emailModal.emailOpts = response.data;
              self.$refs.doiEmailModal.showModal();
            }
          }
        })
        .catch(function (error) {
          if(error.response && error.response.data && error.response.data.detail){
            alert(error.response.data.detail);
          }
        })
        .then(function() {
          self.searchStatus = '';
        });

    },
    arrayToString(data) {
      if(Array.isArray(data)){
        return data.join(", ");
      }
      return data;
    },
    shortenDescription(data) {
      if(data.length > 250) {
        return data.slice(0, 250) + "...";
      }
    }
  },
};
</script>
<style>
div.emailIcon {
  display: inline-block;
  cursor: pointer;
}
</style>