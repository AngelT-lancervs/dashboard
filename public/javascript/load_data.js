import { tiempoArr, precipitacionArr, uvArr, temperaturaArr } from './static_data.js';


let fechaActual = () => new Date().toISOString().slice(0, 10);

let cargarPrecipitacion = () => {

  //Obtenga la función fechaActual
  let actual = fechaActual();
  //Defina un arreglo temporal vacío
  let datos = []
  //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const precipitacion = precipitacionArr[index]

    if (tiempo.includes(actual)) {
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
  precipitacionPromValue.textContent = `Prom ${Math.round(prom * 100) / 100} [mm]`
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

  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const uv = uvArr[index];

    if (tiempo.includes(actual)) {
      datos.push(uv);
    }
  }

  let max = Math.max(...datos);
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0);
  let prom = (sum / datos.length) || 0;

  let uvMinValue = document.getElementById("uvMinValue")
  let uvPromValue = document.getElementById("uvPromValue")
  let uvMaxValue = document.getElementById("uvMaxValue")
  //Actualice los elementos HTML con los valores correspondientes
  uvMinValue.textContent = `Min ${min} [mm]`
  uvPromValue.textContent = `Prom ${Math.round(prom * 100) / 100} [mm]`
  uvMaxValue.textContent = `Max ${max} [mm]`

}

cargarUv();

let cargarTemperatura = () => {

  let actual = fechaActual();
  let datos = [];

  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const tmp = temperaturaArr[index];

    if (tiempo.includes(actual)) {
      datos.push(tmp);
    }
  }

  let max = Math.max(...datos);
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0);
  let prom = (sum / datos.length) || 0;

  let tmpMinValue = document.getElementById("temperaturaMinValue")
  let tmpPromValue = document.getElementById("temperaturaPromValue")
  let tmpMaxValue = document.getElementById("temperaturaMaxValue")
  //Actualice los elementos HTML con los valores correspondientes
  tmpMinValue.textContent = `Min ${min} [mm]`
  tmpPromValue.textContent = `Prom ${Math.round(prom * 100) / 100} [mm]`
  tmpMaxValue.textContent = `Max ${max} [mm]`

}

let cargarOpenMeteo = () => {

  //URL que responde con la respuesta a cargar
  let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m';
  let URL2 = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=cloud_cover'

  fetch(URL)
    .then(responseText => responseText.json())
    .then(responseJSON => {

      console.log(responseJSON);

      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot1');
/*
      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;

      //Etiquetas de los datos
      let data = responseJSON.hourly.temperature_2m;
      let data2 = responseJSON.hourly.relativehumidity_2m;

*/      
      let labels = responseJSON.hourly.time.slice(0, 5);
      let data = responseJSON.hourly.temperature_2m.slice(0, 5);
      let data2 = responseJSON.hourly.relativehumidity_2m.slice(0, 5);

      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              borderColor: "red",
              label: 'Temperature [2m]',
              data: data,
              borderWidth: 1,
            },
            
            {
              borderColor: "blue",
              label: 'Relative Humedity [2m]',
              data: data2,
            }
          ]
        },
        options: {
          //maintainAspectRatio: false,

        }

      };

      //Objeto con la instanciación del gráfico
      let chart1 = new Chart(plotRef, config);

    })

  fetch(URL2)
    .then(responseText => responseText.json())
    .then(responseJSON => {

      console.log(responseJSON);

      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot2');

      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time.slice(0,5);

      //Etiquetas de los datos
      let data = responseJSON.hourly.cloud_cover.slice(0,5);

      //Objeto de configuración del gráfico
      const config2 = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              borderColor: "black",
              label: 'Cloudly [2m]',
              data: data,
              fill: false,
              borderWidth: 1,
              pointStyle: 'rectRot',
              pointRadius: 6,
              pointBorderColor: 'rgb(0, 0, 0)'
            },
            
          ]
        },
        options: {
          //maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
            }
          }
        },
        

      };

      //Objeto con la instanciación del gráfico
      let chart2 = new Chart(plotRef, config2);

    })
    .catch(console.error);
  

}


cargarOpenMeteo()
cargarTemperatura()
cargarPrecipitacion()
cargarFechaActual()


//Guía 10
let parseXML = (responseText) => {

  // Parsing XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");


  // Referencia al elemento `#forecastbody` del documento HTML

  let forecastElement = document.querySelector("#forecastbody")
  forecastElement.innerHTML = ''

  // Procesamiento de los elementos con etiqueta `<time>` del objeto xml
  let timeArr = xml.querySelectorAll("time")

  timeArr.forEach(time => {

    let from = time.getAttribute("from").replace("T", " ")

    let humidity = time.querySelector("humidity").getAttribute("value")
    let windSpeed = time.querySelector("windSpeed").getAttribute("mps")
    let precipitation = time.querySelector("precipitation").getAttribute("probability")
    let pressure = time.querySelector("pressure").getAttribute("value")
    let cloud = time.querySelector("clouds").getAttribute("all")

    let template = `
  <tr>
  <td>${from}</td>
  <td>${humidity}</td>
  <td>${windSpeed}</td>
  <td>${precipitation}</td>
  <td>${pressure}</td>
  <td>${cloud}</td>
  </tr>
  `

    //Renderizando la plantilla en el elemento HTML
    forecastElement.innerHTML += template;
  })

}

//Callback
let selectListener = async (event) => {

  let selectedCity = event.target.value
  // Lea la entrada de almacenamiento local
  let cityStorage = localStorage.getItem(selectedCity);

  if (cityStorage == null) {

    try {

      //API key
      let APIkey = 'fdafd5b1e200549eb6f7a0285b487f91'
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`

      let response = await fetch(url)
      let responseText = await response.text()

      await parseXML(responseText)
      // Guarde la entrada de almacenamiento local
      await localStorage.setItem(selectedCity, responseText)
    } catch (error) {
      console.log(error)
    }

  } else {
    // Procese un valor previo
    parseXML(cityStorage)
  }


}

let loadForecastByCity = () => {

  //Handling event
  let selectElement = document.querySelector("select")
  selectElement.addEventListener("change", selectListener)

}

loadForecastByCity();

let botonActualizar = document.getElementById("botonActualizar");

botonActualizar.addEventListener("click", () => {
  actualizarDatos();
  mostrarCargando();
});

let actualizarDatos = () => {
  localStorage.clear();
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  let selectElement = document.querySelector("select");
  selectElement.value = "Ciudades";
};

//GUIA 11

let loadExternalTable = async () => {

  //Requerimiento asíncrono
  let url = 'https://www.gestionderiesgos.gob.ec/monitoreo-de-inundaciones/'
  let proxyURL = 'https://cors-anywhere.herokuapp.com/'
  let endpoint = proxyURL + url


  let response = await fetch(endpoint)
  let responseText = await response.text()

  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "text/html");

  let table = xml.querySelector("#postcontent table")

  document.getElementById("monitoreo").innerHTML = table.outerHTML

 }
 
 loadExternalTable()

 //reloj
 function actualizarReloj() {
  // Obtener la zona horaria del navegador del usuario
  let zonaHorariaUsuario = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Crear un objeto Date con la zona horaria deseada
  let fecha = new Date();
  let hora = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();

  let segundosFormateados = segundos <= 9 ? `0${segundos}` : segundos;
  let horasFormateadas = hora <= 9 ? `0${hora}` : hora;
  let minutosFormateados = minutos <= 9 ? `0${minutos}` : minutos;

  // Actualizar el contenido del elemento con id "reloj"
  let reloj = document.getElementById('reloj');
  reloj.textContent = `Hora actual (${zonaHorariaUsuario}): ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;

  if (hora % 3 == 0 && minutos == 0 && segundos == 0) {
    actualizarDatos();
  }
}
// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);

// Llamar a la función para mostrar la hora actual inmediatamente
actualizarReloj();

//animacion
function mostrarCargando() {
  var cargandoOverlay = document.getElementById('cargando-overlay');
  cargandoOverlay.style.display = 'flex'; // Muestra la superposición
  setTimeout(function() {
      cargandoOverlay.style.display = 'none'; // Oculta la superposición después de un tiempo (aquí puedes agregar tu lógica de actualización de datos)
  }, 3000); // Ajusta el tiempo según tus necesidades
}