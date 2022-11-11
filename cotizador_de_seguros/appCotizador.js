//variables
const cotizarSeguro=()=>{
    let marca=document.querySelector("#marca").value;
    let year=document.querySelector("#year").value;
    let basico=document.querySelector("#basico");
    let completo=document.querySelector("#completo");


    let divResumen=document.querySelector("#resumen");
    let divResultado=document.querySelector("#resultado");
    divResultado.style.display="none"

    let plan="";

    if(basico.checked){
        plan="basico";
    }else if(completo.checked){
        plan="completo";
    }
//funcion para mostrar error    
    if(marca ==='' ||
        year===''||
        plan===''){
            mostrarError("#msj-error","Falta seleccionar opciones");
            return;
        }
    
 //resumen de cotizacion   
        let cotizacion={marca,year,plan};
    document.querySelector("#msj").style.display="none";

    divResumen.style.backgroundColor="FFF";
    divResumen.style.display="block";

    divResumen.innerHTML=`<div style="text-aling:center">
                             <img src="spinnerCarga.gif" width=250 height=250>
                          </div>`;
    
    setTimeout(()=>{
        divResumen.style.backgroundColor="#F9E4B7";
        divResumen.innerHTML=`
                        <h2> Resumen de Cotizacion</h2>
                         <ul>
                             <li>Marca: ${marca}</li>
                             <li>Plan: ${plan}</li>
                             <li>Año del telefono: ${year}</li>
                             
                         <ul>
                         `;
        let cotizacionFinal=cotizar(cotizacion);
        divResultado.style.display="block";
        divResultado.className="divResultado"     
        divResultado.innerHTML=`<p class="textoCotizacion">$ ${cotizacionFinal} </p>`;
    },1500);     
}    
//resultado y calculo de la cotizacion       
const cotizar=(cotizacion)=>{
    const {marca, year, plan}=cotizacion;
    let resultado=3000;

    const diferenciaYear=diferencia(year);
    resultado-=((diferenciaYear*3)*resultado)/100;

    resultado=calcularMarca(marca)*resultado;
    const incrementoPlan=obtenerPlan(plan);
    resultado=parseFloat(incrementoPlan*resultado).toFixed(2);
    return resultado;
}
const obtenerPlan=plan=>{
    return (plan==='basico')?1.20:1.50;
}


const calcularMarca=marca=>{
    let incremento;

    switch(marca){
        case 'iphone': incremento=1.70; break;
        case 'samsung': incremento=1.60; break;
        case 'motorola': incremento=1.35; break; 
        case 'xiaomi': incremento=1.25; break; 
        case 'huawei': incremento=1.15; break; 

    }
    return incremento;
}

const diferencia=(year)=>{
    return new Date().getFullYear()-year;
}

//alerta error
const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="alert alert-danger error">${mensaje}</p>`;
    setTimeout(()=>{ divError.innerHTML=``;}, 2000);
}