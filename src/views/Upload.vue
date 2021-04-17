<template>
 

    <div class="research-modal" > 
        
        <!-- <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header> -->
        <!-- <b-container fluid class="mt-4"> -->
            
            <div class="card text-black">
                
                <div class="col-lg mx-auto form p-0" style="border-radius: 4px; -webkit-box-shadow: 0 0 15px #9b9d9e;"> 
                    <b-icon-x icon = "type-bold" style="float:right; cursor: pointer; height:1.5rem; width:1.5rem; " @click="toggleResearchWindow"> </b-icon-x>
                    <div id="mainUpload">
                        <div class="h2" style="text-align: center"> Add Research Material </div>
                <div class="col-lg mx-auto form p-2" style="border-radius: 4px; -webkit-box-shadow: 0 0 15px #9b9d9e;">
                    <b-icon-x icon = "type-bold" style="float:right; cursor: pointer; height:1.5rem; width:1.5rem; " @click="toggleResearchWindow"> </b-icon-x>
                    <div id="mainUpload">
                        <div class="h1"> Add Research Material </div> 
                        
                        <div class="form-group">
                            <label class="h2" for="title_of_publication">Title</label>
                            <input type="text" class="form-control" placeholder="Enter the title of your research material" rows="2" v-model="title" style="background-color: #fafafa">
                        </div>

                        <div class="form-group">
                            <label class="h2" for="Abstract">Abstract (Optional) </label>
                            <textarea type="text" class="form-control" placeholder="Add Abstract" rows="1" v-model="abstract" style="background-color: #fafafa"></textarea>
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
                                    </div>
                                <small id="fileWarning" class="form-text text-muted" style="text-align: center">PDF Upload Progress</small>
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
                            <label class="btn btn-sm btn-primary" for="fileElem" style="width:12%">Select File</label>
                            <button class="float-right btn btn-sm btn-primary mb1 bg-orange" @click="submitForm">Upload Publication</button>
                        </div>

                    </div>
                </div>
            </div>
        <!-- </b-container> -->
        
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import upload from '@/util/upload';
import calendar from '@/util/calendar';

//ADDED
import axios from "axios";
import { Auth } from 'aws-amplify';
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
    components: { Multiselect },

    props: {
    researchWindowIsOpen: {
      type: Boolean,
      default: false,
      description: 'Whether the research window is open or not'
    }},

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
            currentStatus:null,
            uploadError:null,
            files: [],
            user: {
                username:'',
                firstName: '',
                lastName: '',
            }
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
        this.getUserData();
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
            /*
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
            */

           //ADDED BY:JPB170330
           console.log("BUTTON CLICKED");
           console.log(this.user.username);
           //console.log(this.title);
           //this.getUserData();
           //console.log(this.user.firstName + this.user.lastName);
           //console.log()
           if(this.files.length == 0)
           {
               console.log("NO FILES. ADD FILES.");
           }
           else
           {
               const getSignedURLS = () => {
                   return new Promise((resolve, reject) => {
                       axios
                       .get(`http://localhost:3000/get-signed-url?scope=${encodeURIComponent(this.user.username)}&type=pdf&count=${this.files.length}&title=${this.title}&abstract=${this.abstract}`)
                       //.get(`http://localhost:3000/get-signed-url?scope=${encodeURIComponent(this.user.username)}&type=pdf&count=${this.files.length}`)
                       .then(data => {
                           resolve(data);
                        })
                        .catch(err => {
                            reject(err);
                        });
                    });
                };
                //this function is to reset the page so that the files that have been uploaded are all good
                const reset = () => {
                    // reset form to initial state
                    this.currentStatus = STATUS_INITIAL;
                    this.files = [];
                    this.uploadError = null;
                    this.title = ""
                    this.abstract = ""
                    this.doi = ""
                    this.authors = []
                    this.type = ""
                    this.access = ""
                };
                const uploadMediaToS3 = async () => {
                    const config = {
                        onUploadProgress: function(progressEvent) {
                            var percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                                );
                            console.log(percentCompleted);
                        },
                        headers: {           
                            "Content-Type": "application/octet-stream",
                            // "x-amz-meta-author": this.title || "title",
                            },
                    };
                    const { data } = await getSignedURLS()
                    // .then(data => {
                    //     //console.log(data);
                    //     axios
                    //     .put(data.data.urls[0], this.files[0], config)
                    //     .then(res => console.log("Upload Completed",res))
                    //     .catch(err => console.log("Upload Interrupted",err));
                    // });
                    console.log(JSON.stringify(data))
                    if (data.data && data.data.urls) {
                        console.log(JSON.stringify(data), data.urls)
                        const urlLen = data.data.urls.length;
                        this.currentStatus = STATUS_SAVING
                        data.data.urls.map(async (url, index) => {
                            const file = this.files[index]
                            try {
                                await axios.put(url.signedUrl, file, config)
                                reset();
                            } catch (e) {
                                this.currentStatus = STATUS_FAILED
                                console.log(e)
                            }
                        })
                        if (this.currentStatus !== STATUS_FAILED) {
                            this.currentStatus = STATUS_SUCCESS
                        }
                        //FIX: what's typed in the title box doesn't reset after submitting
                    } else {
                        console.log("its broken")
                    }
                };

            uploadMediaToS3();

             }
        },

        toggleResearchWindow(){
            // this.researchWindowIsOpen = !this.researchWindowIsOpen;
            this.$emit('update', !this.researchWindowIsOpen);
             console.log(this.researchWindowIsOpen);
        },

        getUserData() {
            //gets the profile information stored in Cognito
            Auth.currentAuthenticatedUser().then((value) => {
                var values = value.storage;
                this.user.username = this.$store.state.user.username;
                for (const [key, value] of Object.entries(values)) {
                    //console.log(this.$store.state.user.username);
                    //console.log(value.Username);
                if(value.substring(0, 15) == "{\"UserAttribute") //the user attribute field contains all the user attributes of the current signed in user
                {
                    this.data = value;
                    break ;
                }
                }

                var obj = JSON.parse(this.data);

                for(const [key, value] of Object.entries(obj.UserAttributes)) //push the user information in Cognito to the store's user array and the page's user array (to access it locally, store array cannot be accessed from the HTML)
                {
                    if(value.Name == "custom:last_name")
                    { 
                        this.$store.state.user.lastName = value.Value;
                        this.user.lastName = value.Value;
                        //console.log(this.user.lastName);
                    }

                    if(value.Name == "custom:first_name")
                    {
                        this.$store.state.user.firstName = value.Value;
                        this.user.firstName = value.Value;
                        //console.log(this.user.firstName);
                    }

                    //if(value.Name == )
                }

            });
        }
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
    margin-bottom: 0%;
}
#mainUpload{
    margin: 1%;
}
#drop-area {
    border: 1px solid #e8e8e8;
    width: 100%;
    margin: auto;
    margin-top: 1%;
    margin-bottom: 1%;
    padding: 10px;
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
  background-size: 20px 20px;
}

.h2{
    color: #0b599b;
    font-size: 100%;
    margin-bottom: 0%;
}
#mainUpload{
    margin: 1%;
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
  background-size: 20px 20px;
}
#progress-bar {
    width: 100%;
}
#drop-area.highlight {
    border-color: purple;
}
.my-form {
    margin-bottom: 10px;
    /* width:300px; */
}
.container-fluid{
    padding:0 !important;
}
.research-modal {
    width:800px;
    height:600px;
    overflow-y: hidden;
}
 @media screen and (min-width: 600px) and (max-width: 800px) {
  .research-modal{
    width: 600px;
    /* height:600px; */
 }
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

.form-group{
    margin-bottom: 3px;
}
</style>