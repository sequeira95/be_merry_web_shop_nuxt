<script setup>
  const {params} = useRoute()
  useHead({
      title: `${params.title}`
    })
</script>
<template>
  <div>ANUNCIOS</div>
</template>