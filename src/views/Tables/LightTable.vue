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
                <span style="text-align:right; float:right; font-family:Roboto; font-size: 16px;" class="form-text text-muted">in 0.56 seconds</span> 
                <span class="text-muted d-flex justify-content-center" style="font-family:Roboto; font-size: 16px;">1-25 of 6604 results</span>
            </span>  
              
                <br>
            <span style="position:relative; top:-25px;">
               <CustomSelect
                    :options="['25', '50', '100', '200']"
                    :default="'25'"
                    Selector="Results per page: "
                    Icon="fas fa-chevron-down"
                    class="select my-select-2 size-sm"
                    style="text-align:left; float:left;"
                    @input="alert(displayToKey($event))"/>
                <CustomSelect
                    :options="['Mini ', 'Compact ', 'Expanded ']"
                    :default="'Compact '"
                    Icon="fas fa-expand-arrows-alt"
                    class="select my-select-2 size-sm"
                    style="text-align:right; float:right; "
                    @input="alert(displayToKey($event))"/>
                <b-pagination v-model="currentPage" :per-page="10" :total-rows="100" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" size="sm" style="float:left; position:relative; top: -25px; padding-left:360px;"></b-pagination>
            </span>
        </b-card-header>
        <div style="height: 77vh">
        <splitpanes class="default-theme">
        <pane class="scroll">
        <el-table class="table-responsive table-light"
                  :data="articles"
                  :row-style="tableRowStyle"
                  :show-header="false"
                  :cell-style="{padding: '0', height: '12px'}"
                  size="small"
                  style="width: 100%;"
                  >
            <el-table-column type="expand">
                <template v-slot="{row}">
                    <!--TODO: Indicate the availability of an article <p > Status: 
                        <span class="font-weight-700 name mb-0 text-blue">{{row.status}}</span>
                        <span style="float:right">{{row.date}}</span>
                    </p> -->
                    <!--<span style="float:right">{{row.date}}</span>-->
                    <div style="font-family:Roboto; font-size: 17px; font-weight: 400; padding-bottom:0px; position:relative; top:-15px; margin-bottom:-25px;">
                        <span class="text-black" >{{row.abstract}}</span>
                    </div>
                    <b-modal id="modal" title="Add article to Collection"> <!--TODO: Move this modal to separate function-->
                        <b-list-group>
                            <button class="btn btn-primary">Artificial Intelligence Collection</button>
                            <button class="btn btn-primary">Articles about electricity</button>
                            <button class="btn btn-primary">My favorites</button>
                            <button class="btn btn-light">Create new Collection</button>
                        </b-list-group>
                    </b-modal>
                </template>
            </el-table-column>
            <el-table-column prop="name" >
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center" style="padding-top: 8px">
                        <b-media-body>
                            <span style="font-family:Roboto; font-size: 18px; position:relative;" class="font-weight-400 name mb-0"><v-clamp autoresize :max-lines="1">{{row.name}}</v-clamp></span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center" style="position: relative; top:-10px; margin-bottom: -10px; white-space: nowrap;">
                        <!--<a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>-->
                        <p class="font-weight-400 name mb-0 text-blue" style="font-family:Roboto; font-size: 16px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;position: relative">{{row.author}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">&#8211; {{row.journal}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px; white-space: nowrap;">&#8211; ({{row.year}})</p>
                        <!--TODO: Add ratings <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span> -->
                    </b-media>
                    <span class="button-options border-0" style="padding-left: 10px; position: relative; top:-5px; margin-bottom: -20px;">
                        <button @click="hidePane2 = !hidePane2" title="View"  class="far fa-eye fa-lg button-options"></button>
                        <button title="Download" class="fas fa-file-download fa-lg button-options" ></button>
                        <button title="Links" class="fas fa-external-link-alt fa-lg button-options" ></button>
                        <button title="E-Mail" class="fas fa-envelope fa-lg button-options" ></button>
                        <button title="Collections" v-b-modal.modal class="fas fa-layer-group fa-lg button-options"></button>
                        <button title="Cite" class="fas fa-quote-left fa-lg button-options"></button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        
        </pane>
        <pane v-if="hidePane2" class="scroll">
            <template>
                <CustomPDF></CustomPDF>
            </template>
        </pane>
        </splitpanes>
        </div>
    </b-card>
</template>
<script>
import articles from './articles' //TODO: Replace with AWS source
import {Table, TableColumn} from 'element-ui'
import Dropdown from '../../components/Dropdown.vue'
import CustomSelect from "../../components/CustomSelect.vue";
import CustomPDF from "../../components/CustomPDF.vue";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import VClamp from 'vue-clamp';
import pdf from 'vue-pdf'
export default {
    name: 'light-table',
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
    data() {
        return {
            articles,
            currentPage: 1,
            index: 1,
            count:0,
            url: 'https://bitcoin.org/bitcoin.pdf',
            hidePane2: false,
            options1: [{
                title:'Most Recent',
                link: '#'
            },{
                title:'Most Citied',
                link: '#'
            }],
           
            placement:'down',
            selected: 
                {text: "Most Recent",
                value: "most-recent"} 
            ,
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
          methodToRunOnSelect(payload) {
            this.object = payload;
          }
        }
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
.scroll{
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
.button-options{
    width: 20px;
    border: 0px;
    background-color: inherit;
    padding: 10px 45px 10px 0px;
    color:  #4577B8;
}
.button-options :hover{
    color: #F78626;
}
.button-options :focus{
    color: #F78626;
    border: 0px;
}
.button-options :active{
    border: 0px;
}
.open-item{
    background-color:#DEE2E6;
    background: #DEE2E6;
}
</style>
