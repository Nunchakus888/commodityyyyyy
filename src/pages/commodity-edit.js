import Vue from 'vue';

import '../less/reset.less';
import '../less/preset.less';
import App from '@modules/commodity/Edit.vue';
import '../lib/element.config.js';

new Vue({
    el: '#app',
    render: h => h(App)
});