<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>

    <h1 class="pl-5 pt-4">Add Users</h1>

    <b-container fluid class="pb-4" id="suggested-people-container">
      <b-row no-gutters>
        <b-col cols="4" v-for="user in storageUsers" :key="user.username">
          <b-card
            tag="article"
            style="max-width: 20rem; max-height: 20rem;"
            class="mb-2 mr-3 ml-5 mt-5 mb-3 h-60 rounded-10"
          >
            <div class="text-right" v-if="user.usertype == 'expert'">
              <b-icon icon="star-fill" class="h2" variant="warning"></b-icon>
            </div>
            <div class="text-right" v-else>
              <b-icon icon="" class="h2" variant="warning"></b-icon>
            </div>

            <b-img
              left
              class="avatar avatar-lg rounded-circle"
              :src="user.imageurl"
              style="width: 80px; height: 80px;"
            ></b-img>
            <b-card-text class="text-right font-weight-bolder mr-2">
              {{ user.name }}

              <b-card-text class="text-dark">
                @{{ user.username }}
              </b-card-text>
            </b-card-text>

            <div class="text-right">
              <b-button
                class=""
                href="#"
                variant="primary"
                v-if="user.addStatus == 'Add User'"
                @click="handleAddClick(user)"
                >Add User</b-button
              >
              <b-button
                class=""
                href="#"
                variant="light"
                v-if="user.addStatus == 'Pending'"
                @click="handleAddClick(user)"
                >Pending</b-button
              >
              <b-button
                class="mt-2 mr-2"
                href="#"
                v-if="user.following == 'Follow'"
                variant="warning"
                id="button"
                @click="handleClick(user)"
                >Follow</b-button
              >
              <b-button
                class="mt-2 mr-2"
                href="#"
                v-if="user.following == 'Unfollow'"
                variant="youtube"
                id="button"
                @click="handleClick(user)"
                >Unfollow</b-button
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <div class="category-container">
      <!-- <b-button type="submit" variant="light" class="btn btn-info mr-4" inline>View More</b-button> -->
      <pulse-loader color="orange"></pulse-loader>
    </div>
  </div>
</template>
<script>
export default {
  name: "suggestedpeople",
  props: {},
  data() {
    return {
      suggestions: [],
      storageUsers: '',
      users: [
      {
        imageurl:
          "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5b8576db31358e0429c734e3%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D211%26cropX2%3D2381%26cropY1%3D900%26cropY2%3D3072",
        name: "Steve Jobs",
        username: "stevejobs",
        usertype: "expert",
        department: "computer science",
        interests: ["machine learning", "cloud computing"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://cdn.substack.com/image/fetch/w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F30d834cf-b139-495b-badb-6c678bf38550_256x256.png",
        name: "Jane Doe",
        username: "janedoe",
        usertype: "registered",
        department: "electrical engineering",
        interests: ["nanoelectronics", "semiconductors"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://media-exp1.licdn.com/dms/image/C5603AQHsTGYFOvf4zA/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=Eahg6JlZAGvNatlrK0jhDdHGQzE_jVSqs46IJrLy9Tc",
        name: "Greg Kitchen",
        username: "gkitchen",
        usertype: "expert",
        department: "computer science",
        interests: ["operating systems"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://pbs.twimg.com/profile_images/1295975423654977537/dHw9JcrK_400x400.jpg",
        name: "Elon Musk",
        username: "elonmusk",
        usertype: "registered",
        department: "computer science",
        interests: ["cloud computing"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://media-exp1.licdn.com/dms/image/C5103AQF3oo_VNHHcgQ/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=ntOp8ihDYgE6-zJ4CWebRHLvyB5NWFo3ss1PuEODOHA",
        name: "Mehmet Gunal",
        username: "mgunal",
        usertype: "expert",
        department: "computer science",
        interests: ["cloud computing"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://media-exp1.licdn.com/dms/image/C5603AQGnIrURwiRMYw/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=qHxinAV-uQfMJxTrabBBur6zIIr9ep1LQpyjVdB1omI",
        name: "Kishore Elangovan",
        username: "kelangovan",
        usertype: "registered",
        department: "biology",
        interests: ["microbiology", "genetics"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://media-exp1.licdn.com/dms/image/C4E03AQEKpqT5PwsmGA/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=ua8GMB4D9hUK4FwFR_YUPsvoT4UdI7NXsYeEYh-GOJQ",
        name: "Krishna Boreda",
        username: "kboreda",
        usertype: "expert",
        department: "biology",
        interests: ["marine biology"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://media-exp1.licdn.com/dms/image/C4E03AQFS0dymfWMaOA/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=EQ3HlG-MLRIj5Gg1aM_nhvB6BdZVg3-S8rQ14th6k4E",
        name: "Caleb Hoff",
        username: "choff",
        usertype: "registered",
        department: "neurology",
        interests: ["neuroimmunology"],
        following: "Follow",
        addStatus: "Add User"
      },
      {
        imageurl:
          "https://media-exp1.licdn.com/dms/image/C5603AQH5JXWMiOAikw/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=l1m51fHd9i98ywgyWydtvHKzD7HpZ7CInFXtgiuFyis",
        name: "Spencer Balog",
        username: "sbalog",
        usertype: "registered",
        department: "neurology",
        interests: ["neuroimmunology"],
        following: "Follow",
        addStatus: "Add User"
      }
    ]
    };
  },
  mounted() {
    if(!localStorage.getItem('user-data') || JSON.parse(localStorage.getItem('user-data')).length === 0)
    {
        localStorage.setItem('user-data', JSON.stringify(this.users));
    }

    this.storageUsers = JSON.parse(localStorage.getItem('user-data'));
  },
  methods: 
  {
    handleClick(user) 
    {
        for(var i = 0; i < this.storageUsers.length; i++)
        {
            if(user.username == this.storageUsers[i].username)
            {
                if(this.storageUsers[i].following == "Follow")
                {
                    this.storageUsers[i].following = "Unfollow"; 
                }
                else
                {
                    this.storageUsers[i].following = "Follow";
                }
                
                localStorage.setItem('user-data', JSON.stringify(this.storageUsers));
            }
        }
    },
    handleAddClick(user) 
    {
        for(var i = 0; i < this.storageUsers.length; i++)
        {
            if(user.username == this.storageUsers[i].username)
            {
                if(this.storageUsers[i].addStatus == "Add User")
                {
                    this.storageUsers[i].addStatus = "Pending"; 
                }
                else
                {
                    this.storageUsers[i].addStatus = "Add User";
                }
                
                localStorage.setItem('user-data', JSON.stringify(this.storageUsers));
                console.log(user.username + " is invited to join your network");
            }
        }
    }
  }
};
</script>

<style scoped>
.category-container {
  position: relative;
  width: 100%;
  text-align: center;
}
</style>
