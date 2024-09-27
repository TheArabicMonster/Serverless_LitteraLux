<script>
import axios from 'axios'
import AddOuvrage from '@/views/Partial/AddOuvrage.vue'

export default {
  components: {
    AddOuvrage
  },
  data() {
    return {
      test: null,
    }
  }
}

</script>

<template>
  <div class="addLivre">
    <AddOuvrage></AddOuvrage>
  </div>
</template>

<style scoped>
.about {
  color: black;
}

h1 {
  color: black;
}
</style>
