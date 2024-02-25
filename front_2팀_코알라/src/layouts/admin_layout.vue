<template>
  <admin_header />
  <div class="content">
      <router-view></router-view>
  </div>
</template>

<script>
import admin_header from './admin_header.vue';

export default {
  components: {
      admin_header
  }
}
</script>