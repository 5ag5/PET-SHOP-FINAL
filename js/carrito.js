const {createApp} = Vue 

// const petShop = axios.create({baseUrl: 'https://mindhub-xj03.onrender.com/api/' }) 

const app = createApp ({
    data(){
        return {
        mascotas: [],
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
            console.log(this.carritoMascotas)

        
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
            //this.sacarItem('63a28d37cc6fff6724518aad')

            // let arrayTemporal1 = this.carritoMascotas
            
            // //arrayTemporal1.indexOf('63a28d38cc6fff6724518ab1')
            // arrayTemporal1.splice(arrayTemporal1.indexOf('63a28d38cc6fff6724518ab1'),1)

            // console.log(arrayTemporal1)

            // for(let i =0; i < arrayTemporal1.length;++i){
            // //for(let elemento of arrayTemporal1){
            //     if(arrayTemporal1[i] === "63a28d38cc6fff6724518ab3"){
            //         console.log(contador)
            //         arrayTemporal1.splice(i,1)
            //     }
            //     // }else{
            //     //     contador = contador + 1
            //     // }
            // //}
            // }

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
            let arrayTemporal = this.carritoMascotas

            arrayTemporal.splice(arrayTemporal.indexOf(id),1)
            
            this.carritoMascotas = arrayTemporal
            let arrayJugeteria = []
            let arrayFarmacia = []

            console.log(this.mascotas)
            for(let elemento of this.mascotas){
                for(let identificador of this.carritoMascotas){
                    if(elemento._id === identificador){
                        if(elemento.categoria === "farmacia" ){
                            arrayFarmacia.push(elemento._id)
                        } else {
                            arrayJugeteria.push(elemento._id)
                        }
                    }
                }
            }

            localStorage.setItem('comprar', JSON.stringify(arrayJugeteria))
            localStorage.setItem('comprarRemedios', JSON.stringify(arrayFarmacia))

            console.log(this.carritoMascotas)
            console.log(arrayJugeteria)
            console.log(arrayFarmacia)

            location.reload()
        },

        procesar(){
            Swal.fire({
                title: '¿Estás seguro(a) de procesar el Pago?',
                text: "Procesaremos el pago una vez confirmes",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '##0000ff',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, proceselo!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Procesado!',
                    'Pronto llegara tu pedido!',
                    'success'
                  )
                }
              })
        },
    },
})

app.mount('#appCarrito')