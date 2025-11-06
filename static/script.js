
//Valores de values
let ubicacion=document.getElementById("ubicacion")
let iconos_change=document.getElementById("iconos_change")
let contador=0

//Valores del Dom 

let temp_principal=document.getElementById("temp")
let viento=document.getElementById("viento")
let info_lluvias=document.getElementById("info_lluvias")
let humedad=document.getElementById("humedad")
let presion=document.getElementById("presion")

//Sacar ubicacion del backend de manera automatica(Puerto 5000)
let ubi_automatica=async()=>{

    try{

        let automatico=await axios.get("/location")
        return automatico.data.city
        
    }catch(error){

        console.log(error)

    }   
    
}

let ultima_ciudad=""

//Funcion para obtener todos los datos y cambiar el dom (Llamada primero a la automatica y luego a traves de KeyUP del input)
let getdatos=async()=>{

    try{


        if (ultima_ciudad === "" || contador === 0) {
            ultima_ciudad = await ubi_automatica()
            //console.log(ultima_ciudad)  
            contador++
    
        }

        
        
        let ciudad=ultima_ciudad
         
        //Recogemos datos del servidor
        const enviar=await axios.post("/info",{
            city:ciudad
        })
        let resultados=enviar

        //console.log(resultados.data.name)
        let temperatura=resultados.data.main.temp
        let viento_data=resultados.data.wind.speed
        let lluvias=resultados.data.weather[0].description
        let humedad_data=resultados.data.main.humidity
        let presion_data=resultados.data.main.pressure
        let generico=resultados.data.weather[0].main

        
        
        //Para que no entre mas a ejecutar la ubicacion automatica
        contador+=1
        //Substitucion de Dom por valores API
        temp_principal.textContent=`${temperatura}°C`
        viento.textContent=`${viento_data}Km/h`
        info_lluvias.textContent=`${lluvias}`
        humedad.textContent=`${humedad_data}%`
        presion.textContent=`${presion_data}hPa`

        actualizar(temperatura,generico)
        
    }catch(error){

        console.log(error)

    }
    
}

//Funcion de datos con ip automatica con intervalo


contador_pantalla=0
let pantalla_carga=document.getElementById("load")
let main=document.getElementById("main")
let cambiar_pantalla = async () => {
    await getdatos(); 
    contador_pantalla+=1
    setTimeout(() => {
        pantalla_carga.style.display = "none";
        main.style.display = "flex";
    }, 3500);
    
};

if(contador_pantalla===0){

    cambiar_pantalla();
}





//Funcion para obtener los values a traves del input
ubicacion.addEventListener("keyup",()=>{
    
    ultima_ciudad = ubicacion.value; 
    contador+=1
    setInterval(getdatos,10000)
    getdatos()
    
})



//Actualiza imagenes ,fondos y iconos dependiendo de los valores meterologicos

let actualizar=(temperatura,generico)=>{

    //console.log(temperatura)
    //console.log(generico)

    //Iconos
    if(temperatura>=10 && temperatura<=25){

        //console.log("normal")
        iconos_change.src="../static/assets/logos_temperaturas/Nublado.png"
        iconos_change.style.width="80px"

    }else if(temperatura <=10){

        //console.log("frio")
        iconos_change.src="../static/assets/logos_temperaturas/logo_frio.png"
        iconos_change.style.width="130px"

    }else if(temperatura<0){

        //console.log("congelado")
        iconos_change.src="../static/assets/logos_temperaturas/logo_frio.png"
        iconos_change.style.width="130px"
        


    }else if(temperatura>=25){
        //console.log("calor")
        iconos_change.src="../static/assets/logos_temperaturas/logo_calor.png"
        iconos_change.style.width="80px"


    }
        

    //Fondos
    if(generico==="Rain" && temperatura<0 || generico==="Clouds" && temperatura<0){

        document.body.style.background="url('../static/assets/fondo/fondo_nieve.gif')"
        document.body.style.backgroundSize="cover"
        document.body.style.color="white"
        document.body.style.backgroundAttachment="fixed"

    }else if(generico==="Rain"){
        document.body.style.background="url('../static/assets/fondo/fondo_lluvia.gif')"
        document.body.style.backgroundSize = "cover"
        document.body.style.color="white"
        document.body.style.backgroundAttachment="fixed"
    }else if(generico==="Clear"){
        
        document.body.style.background= "url('../static/assets/fondo/fondo_clear.png')"
        document.body.style.backgroundSize = "cover"
        document.body.style.color="#332c2c"
        document.body.style.backgroundAttachment="fixed"
    }else if(generico==="Snow"){
        document.body.style.background="url('../static/assets/fondo/fondo_nieve.gif')"
        document.body.style.backgroundSize="cover"
        document.body.style.backgroundAttachment="fixed"
    }else if(generico==="Mist"){
        
        document.body.style.background= "url('../static/assets/fondo/fondo_mist.gif')"
        document.body.style.backgroundSize = "cover"
        document.body.style.color="#332c2c"
        document.body.style.backgroundAttachment="fixed"
    }else if(generico=="Clouds"){
        document.body.style.background="url('../static/assets/fondo/fondo_nubes.jpg')"
        document.body.style.backgroundSize="cover"
        document.body.style.color="white"
        document.body.style.backgroundAttachment="fixed"

    }

}




//Icono de informacion
let icono=document.getElementById("icono")
let info=document.getElementById("info_p")


icono.addEventListener("click",()=>{

    Swal.fire({
        icon:"info",
        text:"This project was developed by Jaume (@JaumeCode) as part of a personal weather application. It integrates real-time location detection with live weather data, providing users with a clean, responsive, and dynamic experience.",
        background:"grey",
        color:"white"
})


})

