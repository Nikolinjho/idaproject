<template>
  <div>
    <notifications position="bottom right"/>
    <Nuxt />
  </div>
</template>

<script>
// import Notifications from 'vue-notification';

export default {
  components:{
  // Notifications
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:after,
  &:before {
    -webkit-print-color-adjust: exact;
  }
}

html {
  font-family: 'Source Sans Pro', sans-serif;
  min-height: 100vh;
}

img {
  height: auto;
  max-width: 100%;
  vertical-align: bottom;
}
</style>
