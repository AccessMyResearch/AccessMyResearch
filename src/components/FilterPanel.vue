<template>
<div class="SearchDropDown">
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.SortByAccordion
            variant="primary"
            >Sort By</b-button
            >
        </b-card-header>
        <b-collapse
            id="SortByAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-select
                id="sortByFilter"
                @input="sort"
                v-model="selectedSortBy"
                :options="sortBy"
                ></b-form-select>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.areaAccordion variant="primary">Area</b-button>
        </b-card-header>
        <b-collapse
            id="areaAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-checkbox-group
                id="areaFilter"
                v-model="selectedFilters"
                @input="sort"
                :options="areas"
                name="area"
                ></b-form-checkbox-group>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.expertiseAccordion
            variant="primary"
            >Expertise</b-button
            >
        </b-card-header>
        <b-collapse
            id="expertiseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-checkbox-group
                id="expertiseFilter"
                v-model="selectedFilters"
                :options="expertise"
                name="expertise"
                ></b-form-checkbox-group>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.accessibilityAccordion
            variant="primary"
            >Accessibility</b-button
            >
        </b-card-header>
        <b-collapse
            id="accessibilityAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-group>
                <b-form-checkbox-group 
                style="column-count: 2;"
                id="accessibilityFilter"
                v-model="selectedFilters"
                :options="accessibilityOptions"
                name="acccessibility"
                ></b-form-checkbox-group>
                </b-form-group>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.yearAccordion variant="primary">Year</b-button>
        </b-card-header>
        <b-collapse
            id="yearAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <br/>
                <vue-slider
                v-model="yearRange"
                :min="1950"
                :max="2020"
                :enable-cross="false"
                :tooltip="'always'"
                ></vue-slider>
                <br/>
                <div>Years Selected: {{ yearRange }}</div>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.typeAccordion variant="primary">Type</b-button>
        </b-card-header>
        <b-collapse
            id="typeAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-checkbox-group
                style="column-count: 2;"
                id="typeFilter"
                v-model="selectedFilters"
                :options="types"
                name="type"
                ></b-form-checkbox-group>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.databaseAccordion
            variant="primary"
            >Database</b-button
            >
        </b-card-header>
        <b-collapse
            id="databaseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-checkbox-group
                style="column-count: 2;"
                id="databaseFilter"
                v-model="selectedFilters"
                :options="databases"
                name="database"
                ></b-form-checkbox-group>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>

    <div class="accordion" role="tablist">

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.journalAccordion
            variant="primary"
            >Journals</b-button
            >
        </b-card-header>
        <b-collapse
            id="journalAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body>
            <b-dropdown-group class="small">
                <b-form-checkbox-group
                id="journalFilter"
                v-model="selectedFilters"
                @input="sort"
                :options="journals"
                name="journals"
                ></b-form-checkbox-group>
            </b-dropdown-group>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
</div>
</template>
<script>
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
            yearRange: [1950, 2020],
            selectedFilters: [],
            search: { filter: null, text: "" },
            selectedSortBy: "most-recent",
            sortBy: [
                {
                text: "Most Recent",
                value: "most-recent",
                },
                {
                text: "Most Cited",
                value: "most-cited",
                },
                {
                text: "Most Discussed",
                value: "most-discussed",
                },
                {
                text: "Most Rated",
                value: "most-rated",
                },
                {
                text: "Highest Rated",
                value: "highest-rated",
                },
                {
                text: "Trending",
                value: "trending",
                },
                {
                text: "Expertise",
                value: "expertise",
                },
            ],
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
                },
                {
                text: "Embargoed",
                value: "embargoed",
                },
                {
                text: "Restricted",
                value: "restricted",
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
                },
                {
                text: "Poster",
                value: "poster",
                },
                {
                text: "Presentation",
                value: "presentation",
                },
                {
                text: "Results",
                value: "results",
                },
                {
                text: "Figures",
                value: "figures",
                },
                {
                text: "Video",
                value: "video",
                },
                {
                text: "Stream",
                value: "stream",
                },
                {
                text: "Blog",
                value: "blog",
                },
                {
                text: "Vlog",
                value: "vlog",
                },
                {
                text: "Courses",
                value: "courses",
                },
            ],
            databases: [
                {
                text: "arXiv",
                value: "arxiv",
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
                text: "PubMed",
                value: "pubmed",
                },
                {
                text: "Unpaywall",
                value: "unpaywall",
                },
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