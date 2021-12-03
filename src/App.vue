<template>
  <div id="app">
    <TheNavBar />
    <TheHeader />
    <TheContent/>
  </div>
</template>

<script>
import TheNavBar from "./components/layout/TheNavBar.vue";

import TheContent from "./components/layout/TheContent.vue";
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheNavBar,
    TheHeader,
    TheContent,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
