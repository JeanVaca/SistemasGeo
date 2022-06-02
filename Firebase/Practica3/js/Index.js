const datosdelacuenta = document.querySelector('.datosdelacuenta');
const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');

const configurarMenu = (user)=>{
    if(user){
        db.collection('usuarios').doc(user.uid).get().then(doc =>{
            const html = `
            <p>Nombre: ${ doc.data().nombre } </p>
            <p>Correo: ${ user.email } </p>
            <p>Telefono: ${ doc.data().telefono } </p>
            <p>Direccion: ${ doc.data().direccion } </p>
            `;

            datosdelacuenta.innerHTML = html;
        });

        listaloggedin.forEach(item => item.style.display = 'block');
        listaloggedout.forEach(item => item.style.display = 'none');
    }else{
        listaloggedin.forEach(item => item.style.display = 'none');
        listaloggedout.forEach(item => item.style.display = 'block');
    }
};

const listaproductos = document.getElementById('listaproductos');

const obtenerProductos = (data) => {
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            const producto = doc.data();
            const columna = `
            <div class="col-12 col-md-3"> 
                <img src="img/${producto.imagen}" alt="${producto.nombre}"> 
                <p>${producto.nombre}</p> 
                <p class="text-danger">$${producto.precio}</p> 
                <a href="https://www.paypal.me/grupohernandezalba/${producto.precio}" target="_blank">
                    <button class="btn btn-primary">Pagar Ahora</button>
                </a>
            </div>
            `;

            html += columna;
        });
        listaproductos.innerHTML = html;
    }else{
        listaproductos.innerHTML = `<p class="text-center">Ingresa con tu cuenta para poder ver nuestros productos</p>`
    }
};