<script setup>
  const {params} = useRoute()
  useHead({
      title: `${params.title}`
    })
</script>
<template>
  <div>
    <CategoriesCarousel class="pa-16"></CategoriesCarousel>
    <Separator></Separator>
    <div>ANUNCIOS</div>
  </div>  
</template>