<template>
    <div class="bread">
        <header>
            <p class="bread-content" v-text="keyPath"></p>
        </header>
    </div>
</template>

<script>
    export default {
        props: ['vm'],
        data() {
            return {
                keyPath: '',
                currentNav: 1,

                navList: [{
                    text: '设备基本信息',
                    url: '/device/info/list',
                }, {
                    text: '货架部署管理',
                    url: '/rack/list',
                }, {
                    text: '货架售卖管理',
                    url: '/replenishment/replenish/list',
                }],
            };
        },
        mounted() {
            this.vm.$on('navigation-title', keyPath => {
                this.keyPath = keyPath.join('／');
            });
        },

        methods: {
            selected(url) {
                const path = window.location.pathname;
                return path.indexOf(url) > -1;
            },
        },
    };
</script>

<style lang="less">
    @import '../less/preset.less';

    header {
        height: 50px;
        border-bottom: #ededed solid 1px;
    }

    .bread-content {
        font-size: 16px;
        line-height: 50px;
    }
</style>