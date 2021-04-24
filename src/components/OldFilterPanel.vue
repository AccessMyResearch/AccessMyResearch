<template>
<!-- <div style="overflow-y:scroll; height: 60rem;"> -->
<div class="SearchDropDown">
 
    <div class="accordion" role="tablist">
        <!-- <div style="overflow-y:auto; height: 20rem;"> -->
        <b-card no-body class="filterPanelCard" style="max-height:70px;">
        <b-card-header header-tag="header" class="p-1 firstFilter" role="tab">
            <b-button
            block v-b-toggle.SortByAccordion squared variant="#4577B8"
            class = "dropdownButton"><div>Research<span><i class="fas fa-plus fa-sm addItem"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="SortByAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            </b-card-body>
        </b-collapse>
        </b-card>
    
        <b-card no-body class="filterPanelCard">
            <b-card-body style="max-width:220px">
            <b-form-group class="small slider">
                <br/>
                <div style="position: relative; z-index: 0;"> <!-- forces slider to gray out when any modal opens (upload research modal) -->
                    <vue-range-slider 
                    :bg-style="bgStyle" 
                    :tooltip-style="tooltipStyle" 
                    :process-style="processStyle" 
                    v-model="yearRange"
                    :min="1950"
                    :max="2021"
                    ></vue-range-slider>
                 </div>
            </b-form-group>
            </b-card-body>
        </b-card>
    
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.typeAccordion squared variant="outline-primary"
             class = "dropdownButton toggleBg" 
            ><div>Type<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="typeAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            <b-form-group class="small">
                <b-form-checkbox-group
                class="collapseAccordion"
                id="typeFilter"
                v-model="selectedFilters"
                :options="types"
                name="type"
                disabled-field="notEnabled"
                stacked
                ></b-form-checkbox-group>
            </b-form-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.accessibilityAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            >
            <div>Accessibility<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="accessibilityAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            <b-form-group class="small">
                <b-form-group>
                <b-form-checkbox-group 
                class="collapseAccordion"
                id="accessibilityFilter"
                v-model="selectedFilters"
                :options="accessibilityOptions"
                name="acccessibility"
                disabled-field="notEnabled"
                stacked
                ></b-form-checkbox-group>
                </b-form-group>
            </b-form-group>
            </b-card-body>
        </b-collapse>
        </b-card>
        
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.databaseAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            ><div>Database<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button
            >
        </b-card-header>
        <b-collapse
            id="databaseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            <b-form-group class="small">
                <b-form-checkbox-group
                class="collapseAccordion"
                id="databaseFilter"
                v-model="selectedFilters"
                :options="databases"
                name="database"
                disabled-field="notEnabled"
                stacked
                ></b-form-checkbox-group>
            </b-form-group>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.journalAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            ><div>Journals<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button
            >
        </b-card-header>
        <b-collapse
            id="journalAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            <b-form-group class="small">
                <b-form-checkbox-group
                id="journalFilter"
                class="collapseAccordion"
                v-model="selectedFilters"
                @input="sort"
                :options="journals"
                name="journals"
                disabled-field="notEnabled"
                stacked
                ></b-form-checkbox-group>
            </b-form-group>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.areaAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg">
            <div>Area<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="areaAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            <b-form-group class="small" style="max-width: 5rem;">
                <b-form-checkbox-group
                id="areaFilter"
                class="collapseAccordion"
                v-model="selectedFilters"
                @input="sort"
                name="area"
                disabled-field="notEnabled"
                stacked
                >
                <b-form-checkbox value="orange">Orange<b-button size="sm" pill v-b-popover.hover.right="'Info about fruits!'" variant="primary"><i class="fas fa-info-circle"></i></b-button></b-form-checkbox>
                <b-form-checkbox value="apple">Apple</b-form-checkbox>
                <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    

    
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.expertiseAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            >
            <div>Expertise<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button
            >
        </b-card-header>
        <b-collapse
            id="expertiseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            <b-form-group class="small">
                <b-form-checkbox-group
                id="expertiseFilter"
                class="collapseAccordion"
                v-model="selectedFilters"
                :options="expertise"
                name="expertise"
                disabled-field="notEnabled"
                stacked
                ></b-form-checkbox-group>
            </b-form-group>
            </b-card-body>
        </b-collapse>
        </b-card>
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.collectionAccordion
            squared variant="outline-primary"
            class = "dropdownButton"
            ><div>Collections<span><i class="fas fa-chevron-down downArrow"></i></span></div></b-button
            >
        </b-card-header>
        <b-collapse
            id="collectionAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:220px">
            </b-card-body>
        </b-collapse>
        </b-card>
    
    <!-- </div>     -->
    </div>
<!-- </div> -->
</div>

</template>
<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import { VBPopoverPlugin } from 'bootstrap-vue'
export default {
    name: 'filter-panel',
    mounted() {
        if (localStorage.selectedFilters) {
        this.selectedFilters = localStorage.selectedFilters.split(",");
        }

        if (localStorage.yearRange) {
        this.yearRange = localStorage.yearRange.split(",");
        }

        if (localStorage.defaultFilterCheckbox) {
        this.defaultFilterCheckbox = localStorage.defaultFilterCheckbox;
        }
    },
    components: {
        VueRangeSlider,
    },
    data() {
        return {
            //autocomplete start
            modal: false,
            recentSearches: [],
            filteredRecentSearches: [],
            defaultFilterCheckbox: false,
            // autocomplete end
            /*results_data_actual: [],
            results_data: [],*/
            yearRange: [1950, 2021],
            selectedFilters: [],
            search: { filter: null, text: "" },
            selectedSortBy: "most-recent",
            areas: [
                {
                text: "Computer Science",
                value: "cs",
                },
                {
                text: "Electrical Engineering",
                value: "ee",
                },
                {
                text: "Neuroscience",
                value: "ns",
                },
            ],
            expertise: [
                {
                text: "Anyone",
                value: "any",
                },
                {
                text: "1-5 Peer Review Publications",
                value: "1-5",
                },
                {
                text: "5-20 Peer Review Publications",
                value: "5-20",
                },
                {
                text: "20-100 Peer Review Publications",
                value: "20-100",
                },
                {
                text: "100+ Peer Review Publications",
                value: "100+",
                },
            ],
            accessibilityOptions: [
                {
                text: "Open",
                value: "open",
                },
                {
                text: "With Permission",
                value: "with-permission",
                notEnabled: true,
                },
                {
                text: "Embargoed",
                value: "embargoed",
                notEnabled: true,
                },
                {
                text: "Restricted",
                value: "restricted",
                notEnabled: true,
                },
            ],
            types: [
                {
                text: "Peer Review",
                value: "peer-review",
                },
                {
                text: "Pre Print",
                value: "pre-print",
                },
                {
                text: "Book Chapter",
                value: "book-chapter",
                notEnabled: true,
                },
                {
                text: "Poster",
                value: "poster",
                notEnabled: true,
                },
                {
                text: "Presentation",
                value: "presentation",
                notEnabled: true,
                },
                {
                text: "Video",
                value: "video",
                notEnabled: true,
                },
                {
                text: "Stream",
                value: "stream",
                notEnabled: true,
                },
                {
                text: "Course",
                value: "course",
                notEnabled: true,
                },
                {
                text: "Blog",
                value: "blog",
                notEnabled: true,
                }
            ],
            databases: [
                {
                text: "AGRIS",
                value: "agris"
                },
                {
                text: "arXiv",
                value: "arxiv",
                },
                {
                text:"BASE",
                value: "base",
                },
                {
                text: "CORE",
                value: "core",
                },
                {
                text: "DBLP",
                value: "dblp",
                },
                {
                text: "DOAJ",
                value: "doaj",
                },
                {
                text:"IEEE Xplore",
                value: "ieee",
                notEnabled: true,
                },
                {
                text:"JSTOR",
                value: "jstor",
                },
                {
                text: "PubMed",
                value: "pubmed",
                },
                {
                text:"PubPsych",
                value:"pubpsych"
                },
                {
                text:"SSRN",
                value: "ssrn",
                },
                {
                text:"Unpaywall",
                value:"unpaywall"
                }
            ],
            journals: [
                {
                text: "PLOS ONE", 
                value: "plos one"
                },
                {
                text: "Royal Society Open Science",
                value: "royal society open science"
                },
                {
                text: "Nature",
                value: "nature"
                },
                {
                text: "Science",
                value: "science"
                },
            ]
        };
    },
    methods: {
        //default filter start
        defaultFilterCheckboxChecked() {
            localStorage.selectedFilters = this.selectedFilters;
            localStorage.yearRange = this.yearRange;
            localStorage.defaultFilterCheckbox = this.defaultFilterCheckbox;

            if (localStorage.defaultFilterCheckbox == "true") {
                localStorage.clear();
                return;
            }
        }, 
    }
}
</script>
<style scoped>
.dropdownButton {
    text-align: left;
    border: 0px;
    font-size: 16px;
    width: 220px;
    
     
}

.toggleBg.not-collapsed {
  background-color: #4577B8;
  color: white;
}

.addItem{
    float: right; 
    padding: 3px 0px 0px 4px;
}

.downArrow{
    float:right;
    padding: 3px 0px 0px 4px;
}

.accordion{
    overflow-y: auto;
    max-height: 50rem;
}

.collapseAccordion{
    column-count: 1;
}

.firstFilter{
    background-color: #F78626;
}

.filterPanelCard{
    margin-right: 0rem;
    margin-bottom: .25rem !important;
    box-shadow: 0 2px 3px #9b9d9e;
}


.slider .vue-slider .tooltip{
    background-color: #4577B8;
}
</style>