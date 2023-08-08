<script setup>
  definePageMeta({
    layout:"administration",
  })
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const openForm = ref(false)
  const loader = ref(false)
  const isEdit = ref(false)
  const openDelete = ref(false)
  const dialogOtherImg = ref(false)
  const productSelect = ref({})
  const photoSelect = ref([])
  const openDeletePhoto = ref(false)
  const openAddPhoto = ref(false)
  const initialValueProducto = {
    name:'',
    description:'',
    price:0,
    code:'',
    category:'',
    typeProduct:'',
    quanty:0,
    colors:'',
    size:'',
    descuentoPrecio:0,
    imgPrincipal:{},
    otherImg:{}
  }
  const producto = reactive({...initialValueProducto})
  const typeCategory = ref([
    {
      title:"Ropita",
      value:"ropa"
    },
    {
      title:"Accesorios",
      value:"accesorios"
    }
  ])
  const  {data:productos, refresh:refreshProduct}= await useFetch(`${baseURL}/products`)
  const {data:categorias, refresh:refreshCategory} = await useFetch(`${baseURL}/category`,{
    transform:(categorias) =>{
      if(producto.typeProduct) return categorias.filter(e => e.type === producto.typeProduct)
    }
  })
  const {data:anuncios} = await useFetch(`${baseURL}/anuncios`, {query:{active:true}})
  const {data:codigos} = await useFetch(`${baseURL}/codes`)

  async function guardarProducto(){
    console.log(producto)
      try {
        loader.value = true
        const formData = new FormData()
        for(let [key, value] of Object.entries(producto)){
          formData.append(key, value)
        }
        formData.append('principalImg', producto.imgPrincipal[0])
        for( let img in producto.otherImg){
          formData.append('otherImg', producto.otherImg[img])
        }
        await useFetch(`${baseURL}/products`,{
          method:'POST',
          credentials: "include",
          body:formData
        });
        refreshProduct()
      } catch (e) {
        console.log(e)
      }finally{
        loader.value = false
        openForm.value = false
      }
  }
  function openEditar(item){
    producto._id = item._id
    producto.name = item.name
    producto.description = item.description
    producto.typeProduct = item.typeProduct
    producto.price = item.price
    producto.quanty = item.quanty
    producto.size = item.size
    producto.descuentoPrecio = item.descuentoPrecio
    producto.code = item.code._id
    producto.anuncio = item.anuncio._id
    if(item.typeProduct) producto.category = item.category
    openForm.value = true
    isEdit.value = true
  }
  async function editarProducto(){
    try{
      console.log(producto)
      loader.value = true
      const formData = new FormData()
      for(let [key, value] of Object.entries(producto)){
        formData.append(key, value)
      }
      if(producto.imgPrincipal[0]) formData.append('imagen', producto.imgPrincipal[0])
      const {data:res} = await useFetch(`${baseURL}/products/${producto._id}`,{
        method:'POST',
        credentials: "include",
        body:formData //: JSON.stringify({...this.product, imgP:this.imgPrincipal})
      });
      refreshProduct()
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openForm.value = false
    }
  }
  function openAlertDelete(item){
    openDelete.value = true
    producto._id = item._id
  }
  async function eliminarProducto(){
    try{
      loader.value = true
      await useFetch(`${baseURL}/products`,{
        method:'DELETE',
        credentials: "include",
        body:JSON.stringify({...producto})
      });
      refreshProduct()
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openDelete.value = false
    }
  }
  function openDialogImagenes(item){
    dialogOtherImg.value = true
    productSelect.value = item
  }
  async function eliminarPhotos(){
    try{
      loader.value = true
      const res = await useFetch(`${baseURL}/products/deletePhotos/${productSelect.value._id}`,{
        method:'POST',
        credentials: "include",
          body: JSON.stringify({productId:productSelect.value._id, photos:photoSelect.value})
      });
      refreshProduct()
    }catch(e){
      console.log(e)
    }finally{
      dialogOtherImg.value = false
      loader.value = false
    }
  }
  async function guardarFotos(){
    loader.value = true
    const formData = new FormData()
    formData.append('_id', productSelect.value._id)
    for( let img in producto.otherImg){
      formData.append('otherImg', producto.otherImg[img])
    }
    try{
      const res = await useFetch(`${baseURL}/products/addPhoto/${productSelect.value._id}`,{
        method:'POST',
        credentials: "include",
        body:formData
      });
      refreshProduct()
    }catch(e){
      console.log(e)
    }finally{
      dialogOtherImg.value = false
      openAddPhoto.value = false
      loader.value = false
    }

  }
  watch(openForm, value =>{
    if(!value){
      producto._id = ''
      producto.name = ''
      producto.description = ''
      producto.price = 0
      producto.code = ''
      producto.category = ''
      producto.typeProduct = ''
      producto.descuentoPrecio = 0
      producto.anuncio = ''
      producto.quanty = 0
      producto.colors = ''
      producto.size = ''
      producto.imgPrincipal = {}
      producto.otherImg = {}
    }
  },)
  watch(openDelete, value =>{
    if(!value){
      producto._id = ''
      producto.name = ''
      producto.description = ''
      producto.price = 0
      producto.code = ''
      producto.category = ''
      producto.typeProduct = ''
      producto.descuentoPrecio = 0
      producto.anuncio = ''
      producto.quanty = 0
      producto.colors = ''
      producto.size = ''
      producto.imgPrincipal = {}
      producto.otherImg = {}
    }
  },)
  watch(dialogOtherImg, value =>{
    if(!value){
      productSelect.value = {}
      photoSelect.value = []
    }
  },)
  watch(openAddPhoto, value =>{
    if(!value){
      productSelect.value = {}
      producto.otherImg = []
    }
  },)
  watch(producto, value =>{
    if(value.typeProduct){
      refreshCategory()
    }
  })
</script>
<template>
  <div>
    <div class="d-flex justify-end pa-16">
      <v-btn 
        class="btn_add"
        @click="openForm = true">
        <v-icon>mdi-plus</v-icon>
        Agregar Producto
      </v-btn>
    </div>
    <div class="d-flex justify-center pa-16">
      <v-table>
        <thead>
          <tr>
            <th> Nombre </th>
            <th> Descripción </th>
            <th> Tipo </th>
            <th> Categoria </th>
            <th> Código </th>
            <th> Talla </th>
            <th> Precio </th>
            <th> Cantidad </th>
            <th> Descuento </th>
            <th> Anuncio </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in productos"
            :key="item._id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.typeProduct }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item?.code?.codeName }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quanty }}</td>
            <td>{{ item.descuentoPrecio }}</td>
            <td>{{ item?.anuncio.name }}</td>
            <td>
              <v-btn
                v-if="item && item.imgPrincipal"
                icon="mdi-image"
                color="#FF8BB5"
                variant="text"
                :href="item.imgPrincipal.url"
                target="blank"
              >
              </v-btn>
            </td>
            <td>
              <v-btn
                v-if="item && item.otherImg && item.otherImg[0]"
                icon="mdi-image"
                color="#FF8BB5"
                variant="text"
                @click="openDialogImagenes(item)"
              >
              </v-btn>
            </td>
            <td class="d-flex">
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="#808080"
                @click="openEditar(item)"
              >
              </v-btn>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="#808080"
                @click="openAlertDelete(item)"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-dialog v-model="openForm" width="800px">
      <v-card>
        <v-form class="pa-5">
          <v-text-field
            v-model="producto.name"
            label="Titulo"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="producto.description"
            label="Descripción"
            clearable
          ></v-text-field>
          <div class="separator_form">
            <v-select
              :items="codigos"
              label="Códigos"
              v-model="producto.code"
              item-title="codeName"
              item-value="_id"
              clearable
            ></v-select>
            <v-select
              :items="typeCategory"
              label="Tipo"
              v-model="producto.typeProduct"
              clearable
            ></v-select>
          </div>
          <div class="separator_form">
            <v-select
              v-if="producto.typeProduct"
              :items="categorias"
              label="Categoria"
              v-model="producto.category"
              item-title="name"
              item-value="name"
              clearable
            ></v-select>
            <v-select
              :items="anuncios"
              label="Anuncios"
              v-model="producto.anuncio"
              item-title="name"
              item-value="_id"
              clearable
            ></v-select>
          </div>
          <div class="separator_form">
            <v-text-field
              label="Precio"
              v-model="producto.price"
              type="number"
              clearable
            ></v-text-field>
            <v-text-field
              label="Precio de Descuento"
              v-model="producto.descuentoPrecio"
              type="number"
              clearable
            ></v-text-field>
            <v-text-field
              label="Cantidad"
              v-model="producto.quanty"
              type="number"
              clearable
            ></v-text-field>
          </div>
          <v-text-field
            label="Talla"
            v-model="producto.size"
            clearable
          ></v-text-field>
          <v-file-input
            v-model='producto.imgPrincipal'
            accept="image/*"
            label="Imagen Principal"
            clearable
          >
            <template v-slot:append-inner v-if="isEdit">
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-alert-circle-outline"></v-icon>
                </template>
                Si agrega una imagen se reemplazará la anterior
              </v-tooltip>
            </template>
          </v-file-input>
          <v-file-input
            v-if="!isEdit"
            v-model='producto.otherImg'
            accept="image/*"
            label="Otras imagenes"
            multiple
            clearable
          ></v-file-input>
          <v-btn
            v-if="!isEdit"
            class="me-4 btn_add"
            @click="guardarProducto"
            :loading="loader"
          >
            Guardar
          </v-btn>
          <v-btn
            v-else
            class="me-4 btn_add"
            @click="editarProducto"
            :loading="loader"
          >
            Editar
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openDelete" width="800px">
      <v-card>
        <v-card-text class="pa-5 text-center">¿Está seguro(a) que desea eliminar este producto?</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="btn_add"
            @click="eliminarProducto"
            :loading="loader"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogOtherImg"
      transition="dialog-bottom-transition"
      width="600px"
    >
      <v-card>
        <v-toolbar
          title="Fotos"
          class="title_other_photos"
        ></v-toolbar>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            append-icon="mdi-delete"
            color="red"
            variant="flat"
            v-if="photoSelect[0]"
            @click="openDeletePhoto = true"
          >Eliminar Fotos</v-btn>
          <v-btn
            append-icon="mdi-plus"
            class="btn_add"
            @click="openAddPhoto = true"
          >Agregar Fotos</v-btn>
        </v-card-actions>
        <v-list
          subheader
        >
          <v-list-item 
            v-for="foto of productSelect.otherImg" :key="foto._id"
            :title="foto.name"
            link
            :href="foto.url"
            target="_blank"
            lines="two">
            <template v-slot:prepend>
              <v-checkbox v-model="photoSelect" :value="foto.fileId" hide-details></v-checkbox>
            </template>
          </v-list-item>
        </v-list>

      </v-card>
    </v-dialog>
    <v-dialog v-model="openAddPhoto" width="600px">
      <v-card>
        <v-form class="pa-5">
          <v-file-input
            v-model='producto.otherImg'
            accept="image/*"
            label="Otras imagenes"
            multiple
            clearable
          ></v-file-input>
          <v-btn
            class="me-4 btn_add"
            @click="guardarFotos"
            :loading="loader"
          >
            Guardar
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openDeletePhoto" width="800px">
      <v-card>
        <v-card-text class="pa-5 text-center">¿Está seguro(a) que desea eliminar {{photoSelect.length}} fotos?</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="btn_add"
            @click="eliminarPhotos"
            :loading="loader"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped>
  .btn_add{
    background: #FF8BB5;
    color: #fff;
    box-shadow: none;
    font-family: 'Poppins', sans-serif;
  }
  .v-input__prepend{
    margin: 0 !important;
  }
  .mdi-paperclip{
    display: none;
  }
  .v-table{
    width: 100%;
  }
  th{
    background-color: #FF8BB5;
    color: #FFF !important;
  }
  .separator_form{
    display: flex;
    gap:10px
  }
  .title_other_photos{
    background: #FF8BB5;
    color: #FFF;
  }
</style>