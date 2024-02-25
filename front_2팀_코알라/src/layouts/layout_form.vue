<template>  
  <div>
    <Header />
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'

export default {
  components : {
    Header,Footer
  }
}

</script>
<style>

</style>