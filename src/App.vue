<template>
  <div id="app">
    <QuestionPage></QuestionPage>
  </div>
</template>

<script>
import QuestionPage from "./components/QuestionPage.vue";

export default {
  name: "App",
  components: {
    QuestionPage
  }
};
</script>

<style>
body {
  background-color: #000;
}
#app {
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  margin: -5px 0 0 0;
  height: 85vh;
  background-image: url("https://cy-hwg.cybozu.com/k/api/space/blob/download.do/-/AdobeStock_39802936.jpeg?hash=54B15&id=1417&.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

/* kintoneのDOMを消す */
.contents-actionmenu-gaia,
.gaia-argoui-app-infobar-breadcrumb-iconlist,
.gaia-argoui-app-toolbar-menu,
.gaia-argoui-app-index-pager,
.gaia-argoui-app-index-breadcrumb,
.gaia-argoui-app-index-toolbar {
  display: none;
}
</style>
