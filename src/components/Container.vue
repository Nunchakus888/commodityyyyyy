<template>
    <div id="app" class="box">
        <nav-bar :vm="vm" class="box-nav"/>
        <div class="box-content">
            <bread :vm="vm" class="box-bread"/>
            <slot name="content" class="box-slot"></slot>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Nav from '@components/Nav.vue';
    import Bread from '@components/Bread.vue';

    export default {
        name: 'container',
        components: {
            'nav-bar': Nav,
            'bread': Bread,
        },
        methods: {},
        data() {
            return {
                vm: new Vue(),
            };
        },
    };
</script>

<style lang="less">
    @import '../less/preset.less';

    .box {
        overflow: hidden;
        .horizontal-flex();
    }

    .box-nav {
        width: 300px;
        min-height: 80vh;
    }

    /*.box-bread {*/

    /*}*/

    .box-content {
        padding-right: 20px;
        overflow-x: scroll;
        .flex(1, 1, 0);
    }

    .box-slot {
        max-width: 1000px;
        overflow-x: scroll;
    }

    .nav-menu {
        float: left;
        background: rgb(63, 63, 63);
        width: 15%;
        margin-right: 20px;
    }

    .nav-menu:after {
        clear: both;
        content: "";
    }

    .content {
        display: flex;
    }

    .bread {
        margin-bottom: 20px;
    }
</style>
