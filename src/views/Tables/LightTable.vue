<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Articles
                <i style="float:right" class="fas fa-expand-arrows-alt"></i>
                <p>Rating
                    <i style="padding-left:4px" class="fas fa-sort"></i>
                </p>
            </h3>
        </b-card-header>
        <el-table class="table-responsive table-light"
                  header-row-class-name="thead-light"
                  :data="articles"
                  style="width: 100%">
            <el-table-column type="expand">
                <template v-slot="{row}">
                    <p class="font-weight-400 name mb-0 text-black"> Status: 
                        <span class="font-weight-700 name mb-0 text-blue">{{row.status}}</span>
                        <span style="float:right">{{row.date}}</span>
                    </p>
                    <p class="font-weight-400 name mb-0 text-black"> Abstract: 
                        <span style="font-family:georgia" class="font-weight-300 name mb-0 text-black">{{row.abstract}}</span>
                    </p>
                    <button class="far fa-eye btn btn-success text-white"></button>
                    <button class="fas fa-file-download btn btn-primary"></button>
                    <button class="fas fa-comment btn btn-light"></button>
                    <button v-b-modal.modal class="fas fa-plus btn btn-info"></button>
                    <b-modal id="modal" title="Add article to Collection"> <!--TODO: Move this modal to separate function-->
                        <b-list-group>
                            <button class="btn btn-primary">Artificial Intelligence Collection</button>
                            <button class="btn btn-primary">Articles about electricity</button>
                            <button class="btn btn-primary">My favorites</button>
                            <button class="btn btn-light">Create new Collection</button>
                        </b-list-group>
                    </b-modal>
                    <!--<button class="fas fa-expand btn btn-primary"></button>-->
                </template>
            </el-table-column>
            <el-table-column label="Title"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Image placeholder" :src="row.img" />
                        </a>
                        <b-media-body>
                            <span style="font-family:Verdana" class="font-weight-800 name mb-0 text-sm">{{row.name}}</span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center">
                        <p class="font-weight-400 name mb-0 text-black"> Author(s): 
                            <span class="font-weight-700 name mb-0 text-blue">{{row.author}}</span>
                        </p>
                        <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span>
                    </b-media>
                </template>
            </el-table-column>
        </el-table>
        <b-card-footer class="py-4 d-flex justify-content-end"> <!--TODO: Make these buttons change taable contents-->
            <base-pagination v-model="currentPage" :per-page="10" :total="25"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
import articles from './articles'
import { Table, TableColumn} from 'element-ui'
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