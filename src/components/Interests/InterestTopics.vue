<template>
<div class="topic-list">
    <b-button
        v-for="topic in topics" :key="topic.name"
        v-model="topic.isSet"
        inline
        pill
        :pressed.sync="topic.isSet"
        variant="outline-primary"
        class="text-nowrap"
    >
        <b-icon v-if="topic.isSet" icon="check-circle" aria-hidden="true"/>
        <b-icon v-else icon="circle" aria-hidden="true"/>
        {{ topic.name }}
    </b-button>
</div>
</template>
<script>
export default {
    props: ["topics"]
};
</script>