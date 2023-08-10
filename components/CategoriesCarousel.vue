<script setup>
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const  {data:categorias}= await useFetch(`${baseURL}/category`,{query:{active:true}})
  const  {data:anuncios}= await useFetch(`${baseURL}/anuncios`,{query:{active:true}})
  if(anuncios.value && anuncios.value[0]){
    for(let anuncio of anuncios.value){
      categorias.value.unshift({
        _id:anuncio._id,
        name:anuncio.name,
        imagen:anuncio.imagen,
        anuncio:true
      })
    }

  }
</script>
<template>
  <div>
      <v-slide-group
        show-arrows
        class="categories "
      >
        <v-slide-group-item
          v-for="item of categorias"
          :key="item._id"
        >
        <NuxtLink 
          v-if="item && item.imagen"
          :to="item.anuncio ? `/anuncios-${item.name}/${item._id}` : `/productos-${item.name}`">
          <nuxt-img :src="item.imagen.url"/>
          <p>{{ item.name.toUpperCase() }}</p>
        </NuxtLink>

        </v-slide-group-item>
      </v-slide-group>
  </div>
</template>
<style>
  .categories .v-slide-group__content{
    gap: 4rem;
  }
  .categories img{
    width: 6.625rem;
    height: 6.625rem;
    border-radius: 100%;
    gap: 15px;
    margin: 0 15px;
  }
  .categories p{
    text-align: center;
    font-family: Poppins;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.225rem;
    color: #FF8BB5;
    text-transform: uppercase;
  }
</style>