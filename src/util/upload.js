import axios from "axios";
import { AuthHelperAxios }  from "./auth-helper.js";

//The main export for this util script. Contains an object of all the utility functions related to uploading and file management for the drag-and-drop file uploader, such as what is used in Upload.vue.
export default {
    //Initializes the upload handlers on the upload dropzone. See Upload.vue's mounted method for example.
    init: function(element, files){
        // element: page element for file drop zone.
        // files: a reference to the array of selected files (rather, the array that *will* contain the select files).

        //Prevents default drag behaviors as event
        var preventDefaults = e => {
            e.preventDefault();
            e.stopPropagation();
        };

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, preventDefaults, false)   
            document.body.addEventListener(eventName, preventDefaults, false)
        });
    
        //Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            element.addEventListener(eventName, e=>{
                this.classList.add('highlight');
            }, false)
        });
    
        //Unhighlight drop area when item is no longer over it
        ['dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, e=>{
                this.classList.remove('highlight');
            }, false)
        });
    
        //Handle dropped files
        element.addEventListener('drop', e => {
            let droppedFiles = e.dataTransfer.files;

            if(droppedFiles.length > 1){
                alert("Only one file can be added at a time");
                return;
            }

            files.length = 0;
            droppedFiles.forEach(file => {
                files.push(file);
            });
        }, false);
    },
    upload: async function(url, data, files, progressBar){
        if(!url){
            console.err("No endpoint provided to for upload");
            return;
        }

        if(!data){
            console.err("No form data was provided for upload");
            return;
        }

        if(!files){
            console.err("No files array was provided for upload.");
            return;
        }

        if(files.length === 0){
            alert("Please select a publication to upload.");
            return;
        }
        
        if(files.length > 1){
            alert("Cannot upload more than 1 publication at a time");
            return;
        }

        let file = files[0];

        let updateProgress = p => {
            if(progressBar)
                progressBar.value = p;
        };

        let options = {
            onUploadProgress: e => {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded * 100) / e.total);
                    updateProgress(percentage);
                }
            }
        };

        await AuthHelperAxios.attachAuthenticationHeader(options);

        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('file', file);

        axios.post(url, formData, options)
            .then(res => {
                updateProgress(100);
                alert("File Upload Completed!");
            })
            .catch(err => {
                updateProgress(0);
                alert(err.message);
            });
    }
};
