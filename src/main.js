import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

kintone.events.on('app.record.index.show', () => {
  new Vue({
    render: h => h(App),
  }).$mount('#app');
});
