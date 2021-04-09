<template>
    <div> 
        <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
        <b-container fluid class="mt-4">
            <div class="card text-black" >
                <div class="col-lg mx-auto form p-2" style="border-radius: 4px; -webkit-box-shadow: 0 0 15px #9b9d9e;">
                    <div id="mainUpload">
                        <div class="h1"> Add Research Material </div>
                        
                        <div class="form-group">
                            <label class="h2" for="title_of_publication">Title</label>
                            <input type="text" class="form-control" placeholder="Enter the title of your research material" rows="2" v-model="title" style="background-color: #fafafa">
                        </div>

                        <div class="form-group">
                            <label class="h2" for="Abstract">Abstract (Optional) </label>
                            <textarea type="text" class="form-control" placeholder="Add Abstract" rows="4" v-model="abstract" style="background-color: #fafafa"></textarea>
                        </div>

                        <div class="form-group" v-if="doiVisible">
                            <label class="h2" for="doi">DOI (Optional)</label>
                            <input type="text" class="form-control" placeholder="DOI" v-model="doi" style="background-color: #fafafa">
                        </div>

                        <div class="form-group">
                            <label class="h2" for="Authors">Author(s)</label>
                            <multiselect 
                                v-model="authors.value"
                                :options="authors.options"
                                label="name"
                                track-by="code"
                                placeholder="Add Authors"
                                :multiple="true"
                                :taggable="true"
                                @tag="addTag"
                                class="dropdown-select"
                            >
                            </multiselect>
                        </div>

                        <div class="publication-type">
                            <label class="h2" for="pub-type">Type</label>
                            <multiselect
                                v-model="pubType.value"
                                :options="pubType.options"
                                :allowEmpty="false"
                                :showLabels="false"
                                class="dropdown-select"
                            >
                            </multiselect>
                        </div>
                        <div class="publication-access">
                            <label class="h2" for="access-level">Access</label>
                            <multiselect
                                v-model="visibility.value"
                                :options="visibility.options"
                                :allowEmpty="false"
                                :showLabels="false"
                                class="dropdown-select"
                            >
                            </multiselect>
                        </div>

                        <div id="drop-area" style="background-color: #fafafa">
                            <div id="inner-drop-area">
                                <div class="my-form">
                                    <p style="text-align: center">Drag and drop your file here</p>
                                    <!-- <input type="file" id="fileElem" accept="application/pdf" @change="handleFiles"> -->
                                    <!-- <label class="btn btn-secondary" for="fileElem">Choose File(s)</label> -->
                                    <!-- <button class="float-right btn btn-primary" @click="submitForm">Upload Publication</button> -->
                                </div>
                                <small id="fileWarning" class="form-text text-muted">PDF</small>
                                <progress id="progress-bar" max=100 value=0></progress>
                                <div id="gallery">
                                    <b-button
                                        v-for="file in files" :key="file.name"
                                        disabled
                                    >
                                        {{ file.name }}
                                    </b-button>
                                </div>
                            </div>
                        </div>

                        <div class="upload-button">
                            <input type="file" id="fileElem" accept="application/pdf" @change="handleFiles">
                            <label class="btn btn-primary" for="fileElem" style="width:12%">Select File</label>
                            <button class="float-right btn btn-primary mb1 bg-orange" @click="submitForm">Upload Publication</button>
                        </div>

                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import upload from '@/util/upload';
import calendar from '@/util/calendar';

export default {
    components: { Multiselect },
    data: function(){
        return {
            pubType: {
                value: 'Article',
                options: ["Article", "Book", "Chapter", "Code", "Conference Paper", "Cover Page", "Data", "Experiment Findings", "Method", "Negative Results", "Patent", "Poster",
                "Preprint", "Presentation", "Raw Data", "Technical Report", "Thesis", "Research"]
            },
            visibility:{
                value: 'Accessible to Anyone',
                options: ["Accessible to Anyone", "Accessible on Request", "Not Accessible"]
            },
            title: '',
            authors: {
                value: [],  
                options: [
                    {
                        name: "Samuel Bell",
                        code: "sib170001"
                    },
                    {
                        name: "Anon Laosirilurchakai",
                        code: "axl164630"
                    },
                ]
            },
            abstract: '',
            doi: '',
            date: {
                selected: {
                    day: 1,
                    month: calendar.months[0],
                    year: 1970,
                },
                options: {
                    days: [],
                    months: calendar.months,
                    years: []
                }
            },
            files: []
        };
    },
    computed: {
        doiVisible: function(){
            return this.pubType.value === "Article";
        }
    },
    mounted: function(){
        var uploadElement = document.getElementById('drop-area');
        upload.init(uploadElement, this.files);
    },
    methods:{
        handleFiles: function(event){
            let selectedFiles = [...event.target.files];
            
            this.files.length = 0;
            selectedFiles.forEach(file => {
                this.files.push(file);
            });
        },
        addTag: function (newTag) {
            const tag = {
                name: newTag,
                //"But random isn't unique!" - tell it to the docs: https://vue-multiselect.js.org/#sub-tagging
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }

            var authors = this.authors;
            authors.options.push(tag);
            authors.value.push(tag);
        },
        submitForm: function(){
            this.$ga.event('expert', 'upload', this.title);
            upload.upload(
                this.$endpoints.aspnet + 'upload',
                {
                    type: this.pubType.value,
                    visibility: this.visibility.value,
                    title: this.title,
                    authors: this.authors.value.map(x => x.name),
                    date: {
                        day: this.date.selected.day,
                        month: this.date.selected.month.index,
                        year: this.date.selected.year
                    },
                    abstract: this.abstract,
                    doi: this.doi
                },
                this.files,
                document.getElementById('progress-bar')
            );
        },
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

.h1{
    text-align: center;
    color:#0b599b;
}

.h2{
    color: #0b599b;
    font-size: 100%;
}

#mainUpload{
    margin: 2%;
}

#drop-area {
    border: 1px solid #e8e8e8;
    width: 100%;
    margin: auto;
    margin-top: 1%;
    margin-bottom: 1%;
    padding: 20px;
}
#inner-drop-area{
    width: 95%;
    margin: auto;
    padding: inherit;
    background:
    linear-gradient(to right,#7f7f7f 4px, transparent 4px) 0 0,
    linear-gradient(to right, #7f7f7f 4px, transparent 4px) 0 100%,
    linear-gradient(to left, #7f7f7f 4px, transparent 4px) 100% 0,
    linear-gradient(to left, #7f7f7f 4px, transparent 4px) 100% 100%,
    linear-gradient(to bottom, #7f7f7f 4px, transparent 4px) 0 0,
    linear-gradient(to bottom, #7f7f7f 4px, transparent 4px) 100% 0,
    linear-gradient(to top, #7f7f7f 4px, transparent 4px) 0 100%,
    linear-gradient(to top, #7f7f7f 4px, transparent 4px) 100% 100%;

  background-repeat: no-repeat;
  background-size: 30px 30px;
}
#progress-bar {
    width: 100%;
}
#drop-area.highlight {
    border-color: purple;
}
.my-form {
    margin-bottom: 10px;
}
#gallery {
    margin-top: 10px;
}
#gallery img {
    width: 15%;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
#fileElem {
    display: none;
}

.publication-type {
    display: inline-block;
    width: 49%;
    margin-right: 2%;
}
.publication-access {
    display: inline-block;
    width: 49%;
}
</style>