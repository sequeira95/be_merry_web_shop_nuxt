<script setup>
  const {product} = defineProps(['product'])
</script>
<template>
  <div>
    <div class="product_img">
      <nuxt-img :src="product.imgPrincipal.url"/>
    </div>
    <div class="product_price">
      <p class="pb-2 name">{{ product?.name }}</p>
      <div class="product_price_container_price">
        <p>{{ product?.price }}$</p>
      </div>
      <div>aqui habran otras cosas</div>
    </div>
  </div>
</template>

<style>
  .product_img{
    border: 1px solid #F97272;
    border-radius: 1.25rem;
    width: 18.75rem;
    height: 18.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product_img img{
    width: 16.25rem;
    height: 16.25rem;
    padding: 0.5rem;
  }
  .product_price{
    display: flex;
    flex-direction: column;
    padding: 1.12rem;
  }
  .product_price .name{
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.4375rem;
    color: #F97272;
  }
  .product_price .product_price_container_price{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F97272;
    color: #FFF;
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 100%;
    font-family: Poppins;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
</style>