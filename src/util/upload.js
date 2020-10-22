//************************ Drag and drop *****************//
//Prevents default drag behaviors on drag

// ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//     dropArea.addEventListener(eventName, preventDefaults, false)   
//     document.body.addEventListener(eventName, preventDefaults, false)
// })
// //Highlight drop area when item is dragged over it
// ;['dragenter', 'dragover'].forEach(eventName => {
//     dropArea.addEventListener(eventName, highlight, false)
// })
// //Unhighlight drop area when item is no longer over it
// ;['dragleave', 'drop'].forEach(eventName => { //TODO: Fix this
//     dropArea.addEventListener(eventName, unhighlight, false)
// })
// //Handle dropped files
//dropArea.addEventListener('drop', handleDrop, false)

//Prevents default drag behaviors as event
function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

//Highlights drop area
function highlight(e) {
    this.classList.add('highlight')
}

//Unhighlights drop area
function unhighlight(e) {
    this.classList.remove('highlight')
}

//Updated the progress bar as files upload
function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    progressBar.value = total
}

//Shows file previews (useful for article cover uploads)
function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.createElement('img')
        img.src = reader.result
        document.getElementById('gallery').appendChild(img)
    }
}

export default {
    init: function(opts){
        
        var element = opts.element;

        var self = this;

        //Handles a file drop, calling handleFiles()
        function handleDrop(e) {
            handleFiles(e.dataTransfer.files)
        }

        //Handles files for upload
        function handleFiles(files) {
            if(files.length > 1){
                alert("Only one file can be added at a time");
                return;
            }

            self.setFiles(files);
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, preventDefaults, false)   
            document.body.addEventListener(eventName, preventDefaults, false)
        });
    
        //Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            element.addEventListener(eventName, highlight, false)
        });
    
        //Unhighlight drop area when item is no longer over it
        ['dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, unhighlight, false)
        });
    
        //Handle dropped files
        element.addEventListener('drop', handleDrop, false);

        this.opts = opts;
    },
    setFiles: function(files) {
        this.opts.files.length = 0;
        this.addFiles(...files);
    },
    addFiles: function(...files){
        files.forEach(file => {
            this.opts.files.push(file);
        });
    },
    updateProgress: function(percent){
        this.opts.progressBar.value = percent;
    },
    upload: function(data){
        var self = this;

        var files = this.opts.files;
        if(files.length === 0){
            alert("Please select a publication to upload.");
            return;
        }
        
        if(files.length > 1){
            alert("Cannot upload more than 1 publication at a time");
            return;
        }

        var file = files[0];

        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                const percentage = Math.round((e.loaded * 100) / e.total);
                self.updateProgress(percentage);
            }
        }, false);
        
        xhr.upload.addEventListener("load", function(e){
            self.updateProgress(100);
            alert("File Upload Completed!");
        }, false);

        xhr.open("POST", this.opts.urls.uploadEndpoint);
        xhr.overrideMimeType('multipart/form-data');
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(data));

        xhr.send(formData);
    }
};
