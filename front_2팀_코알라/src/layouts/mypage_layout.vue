<template>
  <mypage_header />
        <div class="content">
      <router-view></router-view>
  </div>
</template>
  
  <script>
  import mypage_header from './mypage_header.vue'

  
  export default {
  name: 'app',
  components: {
    mypage_header
  }
  }
  </script>
  
  <style scoped>
  
  </style>