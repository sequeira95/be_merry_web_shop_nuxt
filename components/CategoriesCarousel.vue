<template>
  <div>
      <v-slide-group
        show-arrows
        class="categories"
      >
        <v-slide-group-item
          v-for="n in 25"
          :key="n"
        >
      <NuxtLink to="#">
        <nuxt-img src="/categorie.png"/>
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
    width: 9.5rem;
    height: 9.6875rem;
    border-radius: 100%;
    gap: 15px;
    margin: 0 15px;
  }
</style>