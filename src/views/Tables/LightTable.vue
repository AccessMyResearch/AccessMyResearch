<template>
    <b-card no-body>
        <b-card-header class="py-3 border-1">
            <small class="text-muted d-flex justify-content-center">1-10 of 6604 publications</small>
            <span style="float:right">
                <small style="text-align:right" class="form-text text-muted">in 0.56 seconds</small> <!--TODO: Show real time-->
                <span class="form-text text-muted fas">
                    <h5>Compact View
                        <i style="padding-left:6px" class="fas fa-expand-arrows-alt"/>
                    </h5>
                </span>
            </span>
            <h4 class="mb-0">Most Recent
                <i style="padding-left:4px" class="fas fa-chevron-down"/>
            </h4>
            <h5 class="mb-0">Results per page: 50
                <i style="padding-left:3px" class="fas fa-chevron-down"/>
            </h5>
        </b-card-header>
        <el-table class="table-responsive table-light"
                  :data="articles"
                  :show-header="false"
                  size="small"
                  style="width: 100%">
            <el-table-column type="expand">
                <template v-slot="{row}">
                    <!--TODO: Indicate the availability of an article <p > Status: 
                        <span class="font-weight-700 name mb-0 text-blue">{{row.status}}</span>
                        <span style="float:right">{{row.date}}</span>
                    </p> -->
                    <span style="float:right">{{row.date}}</span>
                    <p class="font-weight-400 name mb-0 text-black">{{row.abstract}}</p>
                    <button class="far fa-eye btn btn-success text-white"></button>
                    <button class="fas fa-file-download btn btn-primary"></button>
                    <button class="fas fa-comment btn btn-light"></button>
                    <button v-b-modal.modal class="btn btn-info">
                        <i class="fas fa-layer-group"/>
                        <i class="fas fa-plus"/>
                    </button>
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
            <el-table-column prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <b-media-body>
                            <span style="font-family:Verdana" class="font-weight-800 name mb-0 text-sm">{{row.name}}</span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center">
                        <a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>
                        <p class="font-weight-600 name mb-0 text-blue">{{row.author}}</p>
                        <!--TODO: Add ratings <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span> -->
                    </b-media>
                </template>
            </el-table-column>
        </el-table>
        <base-pagination class="py-3 d-flex justify-content-center" v-model="currentPage" :per-page="10" :total="25"></base-pagination>
    </b-card>
</template>
<script>
import articles from './articles' //TODO: Replace with AWS source
import {Table, TableColumn} from 'element-ui'
export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    data() {
        return {
            articles,
            currentPage: 1
        };
    }
}
</script>
<style>
.right {
    width: 15%;
    margin-left: auto;
    float: right;
}
</style>