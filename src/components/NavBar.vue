<template>
  <div>
    <router-link to="/money">money</router-link>
    ｜
    <router-link to="/labels">labels</router-link>
    ｜
    <router-link to="/statistics">statistics</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NavBar'
  };
</script>

<style lang="scss" scoped>

</style>