const calle = document.getElementById('calle');
const colonia = document.getElementById('colonia');
const pais = document.getElementById('pais');
const estado = document.getElementById('estado');
const codigopostal = document.getElementById('codigopostal');
const aceptar = document.getElementById('aceptar');

const database = firebase.database();

aceptar.addEventListener('click', (e) => {
    e.preventDefault();
    database.ref('/users/' + 'Vaca Estrella').set({
        producto: 'JUANPA ZURITA X HAWKERS NEON BLUE CAMO',
        precio: '$1099',
        telefono: '4521052954',
        calle: calle.value,
        colonia: colonia.value,
        pais: pais.value,
        estado: estado.value,
        codigopostal: codigopostal.value,
        coordenadas: '[19.420852° N, -102.062937° W]'
    })
    $('#myModal').modal('hide');
    alert('Su compra ah sido exitosa!!!');
})