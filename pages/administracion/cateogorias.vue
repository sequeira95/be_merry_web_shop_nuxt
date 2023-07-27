<script setup>

  definePageMeta({
    layout:"administration",
  })
  const  {data:categorias}= await useFetch("http://localhost:5000/api/v1/category")
  console.log(categorias)
  const headerCategory = ref([
      {title:'Nombre', key:'name'},
      {title:'Tipo', key:'type'},
      {titñe:'Activo', key:'active'}
  ])
  const openForm = ref(false)
  const initialValueCategory = {
    name:'',
    type:'',
    imagen:{}
  }
  const category = reactive({...initialValueCategory})
  const rulesForm = computed(()=>{
    let rules = {
      required:[
        v=> !!v || "Campo requerido"
      ]
    }
    return rules
  }) 
  async function guardarCategoria(){
    if(!category.name || !category.type){
      return alert("Todos los campos son obligatorios")
    }
    console.log(category.imagen)
    const formData = new FormData()
    for(let [key, value] of Object.entries(category)){
      formData.append(key, value)
    }
    formData.append('imagen', category.imagen[0])
    const {data:res} = await useFetch("http://localhost:5000/api/v1/category",{
      method:'POST',
      credentials: "include",
      body:formData //: JSON.stringify({...this.product, imgP:this.imgPrincipal})
    });
    console.log(res)
  }
  const typeCategory = ref([
    {
      title:"Ropita",
      value:"ropa"
    },
    {
      title:"Accesorios",
      value:"accesirios"
    }
  ])
  /*
  const category = ref({})
  const name = ref('')
  const imgCategory = ref({})*/
</script>
<template>
  <div>
    <div class="d-flex justify-end pa-16">
      <v-btn 
        class="btn_add"
        @click="openForm = true">
        <v-icon>mdi-plus</v-icon>
        Agregar Categoria
      </v-btn>
    </div>
    <div class="d-flex justify-end pa-16">
      <v-data-table
        :items="categorias"
        :headers="headerCategory"
      ></v-data-table>
    </div>
    <v-dialog v-model="openForm" width="600px">
      <v-card>
        <v-form class="pa-5">
          <v-text-field
            v-model="category.name"
            label="Categoria"
            clearable
            :rules="rulesForm.required"
          ></v-text-field>
          <v-select
            :items="typeCategory"
            label="Tipo"
            v-model="category.type"
            clearable
            :rules="rulesForm.required"
          ></v-select>
          <v-file-input
            v-model='category.imagen'
            accept="image/*"
            label="Imagen"
            clearable
            :rules="rulesForm.required"
          ></v-file-input>
          <v-btn
            class="me-4 btn_add"
            @click="guardarCategoria"
          >
            Guardar
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
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
</style>