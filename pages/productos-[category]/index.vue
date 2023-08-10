<script setup>
  const {params} = useRoute()
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const query = {}
  if(params.category === 'ropita' || params.category === 'accesorios'){
    query['typeProduct'] = params.category === 'ropita' ? 'ropa' : params.category
  }else{
    query['category'] = params.category
  }
  const  {data:productos, refresh:refreshProduct}= await useFetch(`${baseURL}/products`,{query,
    transform:(productos) =>{
      return productos.filter(e=> e.quanty > 0)
    }
  })
  useHead({
    title: `${params.category}`
  })
</script>

<template>
  <div>
    <Head>
      <title>Ropita - </title>
    </Head>
    <CategoriesCarousel class="pa-16"></CategoriesCarousel>
    <Separator></Separator>
    <div class="filter_button">
      <v-btn>
        <span>ORDERNAR</span> <v-icon> mdi-tune </v-icon>
      </v-btn>
    </div>
    <div class="product_card">
      <ProductCard v-for=" producto of productos" :key="producto._id" :product="producto"></ProductCard>
    </div>
  </div>
</template>
<style>
  .product_card{
    display: flex;
    flex-wrap: wrap;
    gap: 4.5rem;
    justify-content: center;
  }
  .filter_button{
    display: flex;
    justify-content: flex-end;
    padding: 3rem;
  }
  .filter_button button{
    background: #FCE3A4;
    box-shadow: none;
    color: #F97272;
    font-size: 1.25rem;
    border-radius: 3rem
  }
  .filter_button button span{
    text-align: center;
    font-family: Poppins;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.225rem;
  }
</style>