<template>
<div>
    <base-header class="pb-8 pt-md-8 bg-gradient-primary">
        <h1 class="display-3 text-white text-center">Choose some fields you are interested in</h1>
    </base-header>
    <div class="category-container">
        <InterestCategory 
            v-for="(category, index) in model.categories" :key="category.id"
            :name="category.name"
            :index="index"
            :icon="category.icon"
            :selected="model.selectedCategoryIndex===index"
            v-on:category-select="selectCategory">
        </InterestCategory>
    </div>
    <hr/>
    <div>
        <div class="topic-container">
            <InterestTopics
                :topics="model.categories[model.selectedCategoryIndex].topics"
            >
            </InterestTopics>
        </div>
    </div>
    <hr/>
    <div class="category-container">
        <b-button type="submit" variant="danger" class="btn btn-info" inline @click="dbStuff">Save</b-button>
        <b-button type="submit" variant="danger" class="btn btn-info" to="profile-information" inline>Skip</b-button>
    </div>
</div>
</template>

<script>
import InterestCategory from '@/components/Interests/InterestCategory.vue';
import InterestTopics from '@/components/Interests/InterestTopics.vue';

export default {
    data: function() {
        return {
            model: {
                categories: [
                    {
                        name: "Category 1",
                        id: 0,
                        icon: "terminal",
                        topics: [
                            {
                                name: "Topic 1-1",
                                isSet: false
                            },
                            {
                                name: "Topic 1-2",
                                isSet: false
                            },
                            {
                                name: "Topic 1-1",
                                isSet: false
                            }
                        ]
                    },
                    {
                        name: "Category 2",
                        id: 1,
                        topics: [
                            {
                                name: "Topic 2-1",
                                isSet: false
                            },
                            {
                                name: "Topic 2-2",
                                isSet: false
                            },
                            {
                                name: "Topic 2-3",
                                isSet: false
                            },
                            {
                                name: "Topic 2-4",
                                isSet: false
                            }
                        ]
                    }
                ],
                selectedCategoryIndex: 0
            }
        };
    },
    methods: {
        selectCategory: function (index) {
            this.model.selectedCategoryIndex = index;
        },
        dbStuff: function(event){
            //TODO - there is no where current to persist a user's interests. Should this functionality wish to be completed,
            // we still need to implement a way to store any decisions a user makes regarding their interests.
            alert("dbStuff"); 
        }
    },
    components: {
        InterestCategory,
        InterestTopics
    }
};
</script>

<style scoped>
.category-container {
    position: relative;
    width: 100%;
    text-align: center;
}

.topic-container{
    position: relative;
    text-align: center;
}
</style>
