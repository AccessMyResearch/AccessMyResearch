<template>
  <div>
    <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
  <!-- side filter panel -->
  <div class="profileFilterPanel">
    <div class="accordion" role="tablist" >
        <!-- <div style="overflow-y:auto; height: 20rem;"> -->
        <b-card no-body class="filterPanelCard" style="max-height:70px;">
        <b-card-header header-tag="header" class="p-1 firstFilter" role="tab">
            <b-button
            block v-b-toggle.SortByAccordion squared variant="#4577B8"
            class = "dropdownButton"><div>{{ user.firstName }}<span><i class="far fa-edit fa-lg addItem"></i></span></div>
            </b-button>
        </b-card-header>
        </b-card>
    
        <b-card no-body class="filterPanelCard">
            <img src="img/theme/team-4.jpg" alt="sunil">
        </b-card>
    
        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.bioAccordion squared variant="outline-primary"
             class = "dropdownButton toggleBg" 
             @click="step=0"
            >
            <div>Biography</div>
            </b-button>
        </b-card-header>
        <!-- <b-collapse
            id="bioAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse> -->
        </b-card>
    

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.typeAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            @click="step=1"
            >
            <div>Research<span><i class="fas fa-chevron-down downArrow"></i></span></div>
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
            v-b-toggle.collectionsAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            disabled
            ><div>Collections<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="collectionsAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.projectsAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            disabled
            ><div>Projects<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="projectsAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button 
            block 
            v-b-toggle.grantsAccordion squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            disabled>
            <div>Grants<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button>
        </b-card-header>
        <b-collapse
            id="grantsAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse>
        </b-card>
    

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.showcaseAccordion
            squared variant="outline-primary"
            class = "dropdownButton toggleBg"
            disabled
            >
            <div>Showcase<span><i class="fas fa-chevron-down downArrow"></i></span></div>
            </b-button
            >
        </b-card-header>
        <b-collapse
            id="showcaseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.coursesAccordion
            squared variant="outline-primary"
            class = "dropdownButton"
            disabled
            ><div>Courses<span><i class="fas fa-chevron-down downArrow"></i></span></div></b-button
            >
        </b-card-header>
        <b-collapse
            id="coursesAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="filterPanelCard">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
            block
            v-b-toggle.blogAccordion
            squared variant="outline-primary"
            class = "dropdownButton"
            disabled
            ><div>Blog<span><i class="fas fa-chevron-down downArrow"></i></span></div></b-button
            >
        </b-card-header>
        <b-collapse
            id="blogAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
            <b-card-body style="max-width:235px">
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
    </div>

    <!-- profile body -->
      <b-card no-body class="lightTable-card" style="margin-right:0;">
          <!-- <b-card-header class="border-1" style = "height: 52px;"> 
            <br>
          </b-card-header> -->
          <div style=lightTable-card>
            <div id="Biography" style="overflow-y: scroll; height: 83vh" v-if="step==0"> 
              <div id="About">
                <p style="color: rgb(69, 119, 184); font-size: 24px; padding-left: 10px"><b>About</b>
                <a
                  href="#"
                  role="button"
                  @click="editContent"
                  data-value="edit"
                  id="editIcon"
                ><i id="icon" class="fas fa-pencil-alt" style="float: right; margin: 0.75%"></i></a></p>
                <div id="content">
                <p style="padding-left: 10px; padding-right: 10px"> {{infoText.about}} </p>
                </div>
              </div><hr style="margin:15px">
              
              <div id="Education">
                <p style="color: rgb(69, 119, 184); font-size: 24px; padding-left: 10px"><b>Education</b><i class="fas fa-pencil-alt" style="float: right; margin: 0.75%"></i></p>
                <!-- <p style="padding-left: 10px"> {{infoText.education}} </p> -->
                <p style="padding-left: 10px; padding-right: 10px"> PhD University of Texas at Dallas, Behavioral and Brain Sciences Nov 2020 <br> Focus: Cognition and Neuroscience </p>
              </div><hr style="margin:15px">
              
              <div id="Research Experience">
                <p style="color: rgb(69, 119, 184); font-size: 24px; padding-left: 10px"><b>Research Experience</b><i class="fas fa-pencil-alt" style="float: right; margin: 0.75%"></i></p>
                <p style="padding-left: 10px; padding-right: 10px"> {{infoText.research}} </p>
              </div><hr style="margin:15px">
              
              <div id="Professional Experience" style="margin: 0px">
                <p style="color: rgb(69, 119, 184); font-size: 24px; padding-left: 10px"><b>Professional Experience</b><i class="fas fa-pencil-alt" style="float: right; margin: 0.75%"></i></p>
                <p style="padding-left: 10px; padding-right: 10px"> {{infoText.professional}} </p>
              </div><hr style="margin:15px">

              <div id="Area of Expertise">
                <p style="color: rgb(69, 119, 184); font-size: 24px; padding-left: 10px"><b>Area of Expertise</b><i class="fas fa-pencil-alt" style="float: right; margin: 0.75%"></i></p>
                <p style="padding-left: 10px; padding-right: 10px"> {{infoText.expertise}} </p>
              </div>
            </div> 

            <div id="Research"  style="overflow-y: scroll;" v-if="step==1">  
                <p style="color: rgb(69, 119, 184); font-size: 24px; padding-left: 10px"><b>TEST CONTENT</b></p>
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
                            <span style="font-family:Roboto; font-size: 18px;" class="font-weight-400 name mb-0">{{row.name}}</span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center" style="position: relative; top:-10px; margin-bottom: -10px;">
                        <!--<a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>-->
                        <p class="font-weight-400 name mb-0 text-blue" style="font-family:Roboto; font-size: 16px;">{{row.author}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px;"> &#8211; {{row.journal}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px;"> &#8211; ({{row.year}})</p>
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
            </div>
          
          </div>
      </b-card>
      

    </card>
  </div>
</template>
<script>
import { Auth, AuthHelperRoles } from "@/util/auth-helper.js";
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";
import articles from './../Tables/articles' 

export default {
  name: 'filter-panel',
  components: {
  },
  data() {
    return {
      // panelIsOpen: false,
      data: "",
      articles,
      step: 0,
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
      user: {
        company: "AccessMyResearch",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        education: "",
        city: "",
        country: "",
        state: "",
        aboutMe: "",
        expertise: "",
        university: "",
        selectedFilters: [],
        roles: [],
      },

      infoText: {
        about: "Founder at Access My Research - a nonprofit social network platform with an advanced database search engine connnecting academia to the public and industry by allowing free access to academic publications across the globe. Neuroscientist \n -Expertise in fNIRS, fMRI, EEG and pupillometry with applications on Attention, Learning, and Memory.", 
        research: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        education: "PhD \t University of Texas at Dallas, Behavioral and Brain Sciences\t Nov 2020 \n\t Focus: Cognition and Neuroscience",
        professional: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        expertise: "Brain Imaging"
      }
    };
  },
  computed: {
    signedIn(){
      return this.$store.state.signedIn;
    }
  },
  async mounted() {

        if (localStorage.selectedFilters) {
        this.selectedFilters = localStorage.selectedFilters.split(",");
        }

    await this.getUserData();
    this.getPublishedWorks();
    this.showWorks();
  },
  methods: {
    async getUserData() {
      var user = await Auth.currentAuthenticatedUser();

      for (const [key, value] of Object.entries(user.storage)) { //gets the profile information of the current User stored in Cognito
        if(value.substring(0, 15) == "{\"UserAttribute")
        {
          this.data = value;
          break ;
        }
      }

      const { attributes } = user;
      this.user.firstName = attributes["custom:first_name"];

      this.user.roles = AuthHelperRoles.getUserRoles(user);
    },
<<<<<<< HEAD
=======

>>>>>>> 26fb7d00555c191a4354dd2a66068991994624a1
    // openResearch(){
        
    //     document.getElementById('Research');
    // },

    editContent(){
      if(document.getElementById("editIcon").getAttribute("data-value") == "edit"){
        console.log("content edited")
        document.getElementById("content").contentEditable="true";
        document.getElementById("icon").classList.toggle('fa-pencil-alt');
        document.getElementById("icon").classList.toggle('fa-save');
        document.getElementById("editIcon").setAttribute("data-value", "save");
      }
      else{
        console.log("content saved");
        document.getElementById("content").contentEditable="false";
        document.getElementById("icon").classList.toggle('fa-pencil-alt');
        document.getElementById("icon").classList.toggle('fa-save');
        document.getElementById("editIcon").setAttribute("data-value","edit");
      }
      
    },

    
    SwapDivsWithClick(div1,div2)
    {
      d1 = document.getElementById('About');
      d2 = document.getElementById('Research');
      if( d2.style.display == "none" )
      {
          d1.style.display = "none";
          d2.style.display = "block";
      }
      else
      {
          d1.style.display = "block";
          d2.style.display = "none";
      }
    }



  },
};
</script>

<style scoped>

.profileFilterPanel{
  float: left; 
  width:250px; 
  max-height: 83vh;
  margin-right: 0.75%;
  margin-top: -0.75%;
  overflow-y: auto;
}
.dropdownButton {
    text-align: left;
    border: 0px;
    font-size: 16px;
    width: 235px;
    padding: 10px;
}

img{max-width:100%; max-height: 100%;}

.filterPanelCard{
    margin-right: 0rem;
    margin-bottom: .25rem !important;
    box-shadow: 0 2px 3px #9b9d9e;
}

.toggleBg.not-collapsed {
  background-color: #4577B8;
  color: white;
}

.firstFilter{
  background-color: #F78626;
}

.downArrow{
    float:right;
    padding: 3px 0px 0px 4px;
}

.lightTable-card{
    box-shadow: 0 3px 5px #8898AA; 
    margin-left:20px;
    margin-top: -0.75%;
    display: flex;
}

.sectionStyling{
    padding-left: 30px;
}

.headerStyling{
  color: rgb(69, 119, 184); 
  font-size: 24px;
  font-weight: bold;
}
<<<<<<< HEAD
=======

>>>>>>> 26fb7d00555c191a4354dd2a66068991994624a1
.addItem{
    float: right; 
    padding: 2px 0px 0px 2px;
}

[contenteditable="true"] {
  font-size: 26px;
  padding: .25em 0em;
  margin: 1em 0;
  transition: padding .3s ease-in-out;
}

[contenteditable="true"]:hover,
[contenteditable="true"]:focus {
  padding: .25em;
}

[contenteditable="true"]:hover {
  background: #fafafa;
  outline: 2px solid #eee;
}

[contenteditable="true"]:focus {
  background: #efefef;
  outline: 2px solid rgb(69, 119, 184);
}
</style>