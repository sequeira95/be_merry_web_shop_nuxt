<script setup>
  useHead({
    titleTemplate:(title) =>{
        return title ? `${title} - Be Merry` : 'Be Merry'
      },
  })
</script>
<template>
  <v-app>
  <Header></Header>
  <main class="pt-16">
    <slot/>
  </main>
  </v-app>
</template>
<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    transform: translate(-50px, 0);
    /*filter: blur(1rem);*/
  }
</style>