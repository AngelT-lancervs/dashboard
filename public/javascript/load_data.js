import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';

let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

    //Obtenga la función fechaActual
    let actual = fechaActual();
    //Defina un arreglo temporal vacío
    let datos = []
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]
    
        if(tiempo.includes(actual)) {
          datos.push(precipitacion)
        }
      }
    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datos)
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0);
    let prom = (sum / datos.length) || 0;
    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let precipitacionMinValue = document.getElementById("precipitacionMinValue")
    let precipitacionPromValue = document.getElementById("precipitacionPromValue")
    let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    precipitacionMinValue.textContent = `Min ${min} [mm]`
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    precipitacionMaxValue.textContent = `Max ${max} [mm]`
  
  }
  
  cargarPrecipitacion()


  let cargarFechaActual = () => {
  
    //Obtenga la referencia al elemento h6
    let coleccionHTML = document.getElementsByTagName("h6")
    let tituloH6 = coleccionHTML[0]
    //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
    tituloH6.textContent = fechaActual()
  }
  
  cargarFechaActual()

  let cargarUv = () => {
    
    let actual = fechaActual();
    let datos = [];

    for(let index= 0; index < tiempoArr.length; index++){
        const tiempo = tiempoArr[index];
        const uv = uvArr[index];

        if(tiempo.includes(actual)){
          datos.push(uv);
        }
    }

    let max= Math.max(...datos);
    let min= Math.min(...datos);
    let sum= datos.reduce((a,b) => a + b, 0);
    let prom= (sum/datos.length) || 0;

    let uvMinValue = document.getElementById("uvMinValue")
    let uvPromValue = document.getElementById("uvPromValue")
    let uvMaxValue = document.getElementById("uvMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    uvMinValue.textContent = `Min ${min} [mm]`
    uvPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    uvMaxValue.textContent = `Max ${max} [mm]`

  }

cargarUv();

let cargarTemperatura = () => {
    
  let actual = fechaActual();
  let datos = [];

  for(let index= 0; index < tiempoArr.length; index++){
      const tiempo = tiempoArr[index];
      const tmp = temperaturaArr[index];

      if(tiempo.includes(actual)){
        datos.push(tmp);
      }
  }

  let max= Math.max(...datos);
  let min= Math.min(...datos);
  let sum= datos.reduce((a,b) => a + b, 0);
  let prom= (sum/datos.length) || 0;

  let tmpMinValue = document.getElementById("temperaturaMinValue")
  let tmpPromValue = document.getElementById("temperaturaPromValue")
  let tmpMaxValue = document.getElementById("temperaturaMaxValue")
  //Actualice los elementos HTML con los valores correspondientes
  tmpMinValue.textContent = `Min ${min} [mm]`
  tmpPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
  tmpMaxValue.textContent = `Max ${max} [mm]`

}

cargarTemperatura();