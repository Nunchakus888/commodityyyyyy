<template>
    <div class="m-toast" v-if="visible">
        <div class="pop_overlayer"></div>
        <div class="toast-popup">
            <div class="con">{{text}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'toast',
        props: ['text', 'visible'],
        watch: {
            visible() {
                if (this.visible) {
                    setTimeout(() => { this.$emit('hide') }, 3000);
                }
            },
        },
    };
</script>

<style lang="less">
    @import '../less/preset.less';

    .pop_overlayer {
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #000;
        zoom: 1;
        .rgba(0, 0, 0, 0.4);
        position: fixed;
        z-index: 100;
    }

    .toast-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        .rgba(0, 0, 0, 0.6);
        color: #fff;
        border: none;
        border-radius: 5px;
        text-align: center;
        z-index: 101;
        .con {
            padding: 10px 20px;
            font-size: 14px;
            max-width: 300px;
            min-width: 180px;
            min-height: 45px;
        }
    }
</style>