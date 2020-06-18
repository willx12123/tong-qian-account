<template>
  <div id="app">
    App
    <hr />
    <router-link to="/money">money</router-link>
    <router-link to="/labels">labels</router-link>
    <router-link to="/statistics">statistics</router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
