import Vue from 'vue';

import '../less/reset.less';
import '../less/preset.less';
import App from '@modules/commodity/View.vue';

import '../lib/element.config.js';

new Vue({
    el: '#app',
    render: h => h(App)
});