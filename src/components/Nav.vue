<template>
    <el-menu :default-active="currentLink" :unique-opened="uniqueOpen" class="nav"
             @open="handleOpen" @close="handleClose">
        <div class="title-button">
            <el-button>供应链管理后台</el-button>
        </div>
        <el-submenu v-for="(nav, index) in menuList" :index="nav.title" :key="index">
            <template slot="title">{{ nav.title }}</template>
            <template v-for="item in nav.subItems">
                <el-menu-item :index="item.title" :class="item.style">
                    <a class="nav-link" :href="item.url">{{ item.title }}</a>
                </el-menu-item>
            </template>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        props: ['vm'],
        data() {

            return {
                OPEN_MENU: 'is-active',
                OPEN_SUB_MENU: 'open-sub-menu',
                uniqueOpen: true,
                currentLink: '',
                menuList: [
                    {
                        title: '供应商管理',
                        subItems: [
                            {title: '供应商管理', url: '/supplier/info/list'}
                        ]
                    },
                    {
                        title: '合同管理',
                        subItems: [
                            {title: '合同管理', url: '/contract/list/info'}
                        ],
                    },
                    {
                        title: '商品主档',
                        subItems: [
                            {title: '商品主档', url: '/commodity/info/list'},
                        ],
                    },
                    {
                        title: '供应商产品管理',
                        subItems: [
                            {title: '供应商产品管理', url: '/product/info/list'}
                        ],
                    }]
            };
        },

        mounted() {
            this.menuList.forEach(item => {
                item.subItems.map(i => {
                    if (location.pathname.indexOf(i.url) > -1) {
                        this.currentLink = i.title;
                        item.style = this.OPEN_MENU;
                        i.style = this.OPEN_SUB_MENU;
                        setTimeout(() => this.vm.$emit('navigation-title', [item.title, i.title]));
                    } else {
                        const curPath = i.url.split('/').slice(0, -1).join('/');
                        if (curPath && location.pathname.includes(curPath)) {
                            this.currentLink = i.title;
                            item.style = this.OPEN_MENU;
                            setTimeout(() => this.vm.$emit('navigation-title', [item.title]));
                        }
                    }
                });
            });
        },

        methods: {
            handleOpen(key, keyPath) {
                this.vm.$emit('navigation-title', keyPath);
            },

            handleClose(key, keyPath) {
                this.vm.$emit('navigation-title', keyPath);
            },
        },
    };
</script>

<style lang="less">
    @import '../less/preset.less';

    .el-menu.nav {
        text-align: left;
        margin-right: 20px;
        width: 200px;
        max-width: 200px;
        min-width: 200px;
        min-height: 100vh;

        background-color: rgba(63, 63, 63, 1);

        .title-button {
            display: block;
            text-align: center;

            .el-button {
                width: 80%;
                border-radius: 4px;
                margin: 15px 0;
                background-color: rgba(255, 255, 255, 0.4);
                color: #fff;
                border: none;
                font-size: 12px;
            }
            .el-button:focus,
            .el-button:hover {
                color: rgb(249, 249, 249);
            }
        }

        a,
        .el-submenu__title {
            color: #fff;
            opacity: 0.6;
        }

        .el-submenu .el-menu {
            background-color: rgba(63, 63, 63, 1);
        }

        .open-sub-menu,
        .el-submenu .el-menu-item:hover {
            background-color: rgba(63, 63, 63, 1);
            a {
                color: #fff;
                opacity: 1;
            }
        }
        > .is-active,
        .open-menu,
        .el-submenu__title:hover {
            background-color: rgba(250, 175, 42, 1);
            color: #fff;
            opacity: 1;
        }

        .nav-link {
            display: block;
            width: 100%;
            height: 100%;
        }
    }


</style>