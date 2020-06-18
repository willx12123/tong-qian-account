<template>
  <nav>
    <router-link class="item" to="/money" active-class="icon-active">
      <Icon name="money" />
      <p>记账</p>
    </router-link>
    <router-link class="item" to="/labels" active-class="icon-active">
      <Icon name="label" />
      <p>标签</p>
    </router-link>
    <router-link class="item" to="/statistics" active-class="icon-active">
      <Icon name="chart" />
      <p>统计</p>
    </router-link>
    <router-view />
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'NavBar'
  };
</script>

<style lang="scss" scoped>
  nav {
    width: 100%;
    height: 49px;
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    user-select: none;

    .item {
      width: 33.33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #D2D2D2;

      p {
        font-size: 14px;
      }

      .icon {
        width: 20px;
        height: 20px;
      }
    }

    .item.icon-active {
      color: #222222;
    }
  }
</style>