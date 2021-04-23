<template>
<div class="interest-tab">
    <b-button 
        variant="primary"
        @click="$emit('category-select', index)"
        size="lg"
        class="my-4 text-nowrap"
        :pressed.sync="selected"
    >
        <b-icon v-if="icon" :icon="icon" aria-hidden="true"/>
        {{ name }}
    </b-button>
</div>
</template>
<script>
export default {
    props: ["name", "index", "icon", "selected"]
}
</script>
<style scoped>
.interest-tab {
    display: inline-block;
    padding-left: 10px;
}
</style>