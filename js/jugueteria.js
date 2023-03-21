const {createApp}=Vue

const app= createApp({
    data(){
        return{
            juguetes: [ ],
            precios:[ ],
            preciosOrdenados:[ ],
            filtrados:[],
            busqueda:'',
            checked:[ ],
            ordenar:['ordenar por precio más bajo','ordenar por precio más alto' ],
            cargando:true,
            total:0,
            comprar: JSON.parse( localStorage.getItem('comprar') ) || []
            
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(response=> response.json())
        .then(datos=>{
            let filtrados1=JSON.parse( localStorage.getItem('filtrados') ) || []
            datos.map(element=>console.log(element))
            this.juguetes=datos.filter(element=> element.categoria=="jugueteria").map(el=>{
                let filtrados2=filtrados1?.find(elD=>elD._id==el._id)
                if(filtrados2){
                    el.disponibles=filtrados2.disponibles
                }
                return el
            })
            this.filtrados=datos.filter(element=> element.categoria=="jugueteria")

            this.precios=datos.map(categoria=>categoria.precio)
            console.log(this.juguetes)
            this.cargando=false  
            console.log(this.checked)

        })
        .catch(err => console.log( err ))
    },
    methods:{
        filtro(){
            console.log("funciona")
            this.filtrados=this.juguetes.filter(juguete=>juguete.producto.toLowerCase().includes(this.busqueda.toLowerCase()))
            console.log(this.filtrados)
        },
        filtroCheck(){
            console.log(this.checked)
           
            if(this.checked=='ordenar por precio más bajo'){
                return this.juguetes.sort((x,y)=>x.precio-y.precio);
            }else{
                return this.juguetes.sort((x,y)=>y.precio-x.precio);
            }   
        },
        filtroCruzado(){
            let radio=this.filtroCheck();
            let busqueda= radio.filter(juguete=>juguete.producto.toLowerCase().includes(this.busqueda.toLowerCase()))
            this.filtrados=busqueda
        },
        eliminarProductos(){
            this.comprar=[ ]
        },
        seleccionarProductos(id){
           let juguete= this.filtrados.find(juguete=>juguete._id==id)
           if(juguete.disponibles>0){
            console.log(juguete)
            this.comprar.push(id)
            juguete.disponibles=juguete.disponibles-1;
       
           }   
            localStorage.setItem( 'filtrados', JSON.stringify( this.filtrados) )
        }
    },
    computed:{
        productosCompra(){
            localStorage.setItem( 'comprar', JSON.stringify( this.comprar ) )
            
        },
    }
})
app.mount('#app')
