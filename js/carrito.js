const {createApp} = Vue 

// const petShop = axios.create({baseUrl: 'https://mindhub-xj03.onrender.com/api/' }) 

const app = createApp ({
    data(){
        return {
        mascotas: null,
        carritoMascotas: [],
        mascotasFiltrado :[],
        mascotasNuevoArray: [],
        sumaValores: 0
    }
    },
    
    created(){
        this.getData()
        //this.carritoMascotas = JSON.parse(localStorage.getItem('comprar')) || []
        let arrayTemporal = JSON.parse(localStorage.getItem('comprar')) || []
        let ArrayTemporal2 = JSON.parse(localStorage.getItem('comprarRemedios')) || []
        this.carritoMascotas = arrayTemporal.concat(ArrayTemporal2)
    },

    methods:{
        async getData(){
            try{
            const data = await axios( 'https://mindhub-xj03.onrender.com/api/petshop' )
            this.mascotas = data.data;
            this.mascotasFiltrado = data.data
            console.log(this.mascotas)
        
        // this.mascotasFiltrado.forEach(producto => {
        //     this.carritoMascotas.forEach(element => {
        //         if(producto._id.includes(element)){
        //             this.mascotasNuevoArray.push(producto)
        //         }   
        //     });
        // })

            let arrayTemporal = []
            for(let elemento of this.carritoMascotas){
                arrayTemporal.push(this.mascotas.filter(producto => producto._id.includes(elemento)))
            }

            for(let elemento of arrayTemporal){
                this.mascotasNuevoArray.push(elemento[0])
            }

            this.sumaTotal()
            console.log(this.carritoMascotas)
            //this.sacarItem('63a28d37cc6fff6724518aad')
            // console.log(this.carritoMascotas)

            } catch(err){
                console.log(err)
            }
        },

        sumaTotal(){
        for(let numero of this.mascotasNuevoArray) {
            this.sumaValores = this.sumaValores + numero.precio
        }
        },

        limpiarCarrito(){
            this.carritoMascotas = []
            localStorage.clear();
            location.reload()
        },

        sacarItem(id){
            let contador =0

            for(let elemento of this.carritoMascotas){
                if(elemento === id){
                    this.carritoMascotas.splice(contador,1)
                }else{
                    contador = contador + 1
                }
            }
        }
    },
})

app.mount('#appCarrito')