<template>
    <div class="menu-item">
        <a href="#">
            Sort By: {{title}}
        </a>
        <i style="padding-left:3px" class="fas fa-chevron-down"/>
        <div class="sub-menu">
            <div v-for="(item, i) in items" :key="i"  class="menu-item">
                <a :href="item.link">{{item.text}}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dropdown',
    props: ['title', 'items']
}
</script>
<style>
.menu-item i{
    width: 100px;
}
</style>