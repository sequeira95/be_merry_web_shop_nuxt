<script setup>
  const {params} = useRoute()
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const  {data:producto}= await useFetch(`${baseURL}/products/${params.idProduct}`)
  useHead({
    title: `${producto.value.description}`
  })
</script>
<template>
  <div>
    <CategoriesCarousel class="pa-16"></CategoriesCarousel>
    <Separator></Separator>
    <div>PRODUCTO</div>
  </div>
</template>