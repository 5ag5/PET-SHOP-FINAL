const { createApp } = Vue

const app = createApp( {

    data(){
        return {
            producto: [],
            productos:[],
            id:'',
            params:'',
            estiOrAssis:''
        
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
            .then( response => response.json() )
            .then(datos=>{
                this.productos=datos
                console.log(this.productos)
                this.params=new URLSearchParams(location.search)
                console.log(this.params)
                this.id= this.params.get("id")
                console.log(this.id)
                this.producto=this.productos.find(producto=>producto._id.toString()===this.id);
                console.log(this.producto)
                
            } )
            .catch( err => console.log( err ) )
    },
})

app.mount('#app')