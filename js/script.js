/**
 * Tipos de peticiones-Metodos HTTP
 * get->Bajar recursos
 * post->Crear informacion. Cuando de envia una solicitud por metodo post se puede
 * enviar el body de la solicitud (objeto llave-valor Ej {nombres: pepe, edad:54
 * })
 * delete->Eliminar informacion
 * update->Actualizar información que ya existe en el server
 */
const apiKey = '7fca1b12884279f3bfaffc2b8ff67534';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const lang = 'sp';


const campoCiudad = document.getElementById('campo-ciudad');
const latitud = document.getElementById('latitud');
const longitud = document.getElementById('longitud');
const temperatura = document.getElementById('temperatura');
const nubosidad = document.getElementById('nubosidad');
const info = document.getElementById('info');

function consultarCiudad() {
    let info;
    if (validarCampo(campoCiudad.value)) { // Si la validación es true, ingresa a la lógica
        consultarApi(campoCiudad.value);
    }
    else {
        info.innerHTML = 'Debe ingresar un dato válido en el campo de texto';
    }
    fetch(consultarApi(campoCiudad.value))
        .then(response => response.text())
        .then(data => {
            info = JSON.parse(data);
            actualizarDatos(info);
        })
        .catch(e => console.error(e));
}
let fondo;
function actualizarDatos(info) {
    console.log(info)
    document.getElementById("latitud").innerHTML = 'Latitud: ' + info.coord.lat;
    document.getElementById("longitud").innerHTML = 'Longitud: ' + info.coord.lon;
    document.getElementById("temperatura").innerHTML = 'Temperatura: ' + (parseFloat(info.main.temp) - 273.15).toFixed(2);
    document.getElementById("estado").innerHTML = 'Estado: ' + info.weather[0].description;
    let icono = info.weather[0].icon;
    fondo = info.weather[0].id;
    console.log(fondo);
    document.getElementById('icon').setAttribute('src', `http://openweathermap.org/img/wn/${icono}@2x.png`);
    actualizarFondos(fondo);
}

function consultarApi(ciudad) {
    let url = baseURL;
    url += 'q=' + ciudad;
    url += '&';
    url += 'appid=' + apiKey;
    url += '&lang=' + lang;
    return url;

}

function validarCampo(campoTexto) {
    if (campoTexto == '') {
        return false;
    }
    return true;
}
// Execute a function when the user presses a key on the keyboard
document.getElementById("campo-ciudad").addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("button").click();
    }
});
function actualizarFondos(id) {
    if (fondo = 200 && fondo < 300) {
        document.getElementById("back-ground").classList.add('thunderstorm');
    }
    else if (fondo = 300 && fondo < 400) {
        document.getElementById("back-ground").classList.add('drizzle');
    }
    else if (fondo = 500 && fondo < 600) {
        document.getElementById("back-ground").classList.add('rain');;
    }
    else if (fondo = 600 && fondo < 700) {
        document.getElementById("back-ground").classList.add('snow');;
    }
    else if (fondo = 700 && fondo < 800) {
        document.getElementById("back-ground").classList.add('catastrofe');
    }
    else if (fondo = 800) {
        document.getElementById("back-ground").classList.add('clear');
    }
    else {
        document.getElementById("back-ground").classList.add('clouds');
    }
}