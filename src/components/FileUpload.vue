<template>
    <div class="avatar-uploader" @click="uploadClicked">
        <i :class="{'el-icon-plus': !isUploading, 'el-icon-loading': isUploading}"></i>
        <input type="file" hidden ref="fileInput" :accept="accept" @change="fileSelected">
    </div>
</template>

<script>
    const mimes = {
        image: 'image/png,image/jpeg'
    };

    export default {
        data() {
            return {
                accept: mimes[this.$props.type] || '*'
            };
        },
        props: ['type', 'isUploading'],
        methods: {
            uploadClicked() {
                this.$refs.fileInput.click();
            },
            fileSelected() {
                const files = this.$refs.fileInput.files;
                /*console.log(files);
                const fr = new FileReader();
                const image = new Image();
                fr.onload = function(e) {
                    console.log('onload----->', e);
                    const dataURL = e.target.result;
                    // fileReader.result (data:image/png;base64,iVBORw0KG...)
                    image.src = dataURL;
                };
                fr.readAsDataURL(files[0]);*/
                /*const context = canvas.getContext('2d');
                const canvas = new Canvas();
                canvas.width = image.naturalWidth
                canvas.height = image.naturalHeight
                context.drawImage(image, 0, 0)*/

                if (files.length > 0) {
                    const file = files[0];
                    console.log(file.filename);
                    this.$emit('selectfile', file);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .avatar-uploader {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        & > i,
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
    }

    .avatar-uploader:hover {
        border-color: #20a0ff;
    }
</style>
