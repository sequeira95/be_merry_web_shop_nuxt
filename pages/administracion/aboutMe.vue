<script setup>
  definePageMeta({
    layout:"administration"
  })
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const { data:empresaData } = await useFetch(`${baseURL}/empresa`)
</script>
<template>
  <div class="d-flex justify-center pt-16">
    <div class="container_img">
        <nuxt-img 
          v-if="
            empresaData &&
            empresaData.logo" :src="empresaData.logo.url"/>
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<style>
  .container_img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border: 1px solid #00000054;
    border-radius: 100%;
    position: relative;
  }
  .container_img img{
    width: 100%;
  }
  .container_img button{
    background: #FF8BB5;
    position: absolute;
    bottom: 23px;
    right: -13px;
  }
</style>