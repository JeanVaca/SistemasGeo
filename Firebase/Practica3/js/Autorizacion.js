auth.onAuthStateChanged(user =>{
    if(user){
        db.collection('Productos').onSnapshot(snapshot =>{
            obtenerProductos(snapshot.docs);
        });
        configurarMenu(user);
    }else{
        obtenerProductos([]);
        configurarMenu();
    }
});

const formaingresar = document.getElementById('formaingresar');

formaingresar.addEventListener('submit', (e)=>{
    e.preventDefault();

    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then(cred =>{
        console.log (cred);

        $('#ingresarmodal').modal('hide');
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML='';

    }).catch(err =>{
        formaingresar.querySelector('.error').innerHTML=mensajeError(err.code);
        console.log (err)
    });
});

function mensajeError(codigo){
    let mensaje = '';
    switch(codigo){
        case 'auth/wrong-password':
            mensaje = 'Contraseña incorrecta'
            break;
        case 'auth/user-not-found':
            mensaje = 'Correo incorrecto'
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña debil'
            break;
        default:
            mensaje = 'Ocurrio un error al ingresar con este usuario'
    }
    return mensaje;
}

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();

    auth.signOut().then(()=>{
        alert('El usuario ha salido del sistema');
    });
});

const formaregistrar = document.getElementById('formaregistrar');

formaregistrar.addEventListener('submit', (e)=>{
    e.preventDefault();

    const correo = formaregistrar['rcorreo'].value;
    const contrasena = formaregistrar['rcontrasena'].value;

    auth.createUserWithEmailAndPassword(correo, contrasena).then(cred =>{
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaregistrar['rnombre'].value,
            telefono: formaregistrar['rtelefono'].value,
            direccion: formaregistrar['rdireccion'].value
        });
    }).then( ()=>{
        $('#registrarmodal').modal('hide');
        formaregistrar.reset();
        formaregistrar.querySelector('.error').innerHTML='';
    }).catch(err =>{
        formaregistrar.querySelector('.error').innerHTML=mensajeError(err.code);
    });
});

entrarGoogle = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;
        let html = `
            <p>Nombre: ${ user.displayName } </p>
            <p>Correo: ${ user.email } </p>
            <img src="${ user.photoURL }"></img>
        `;

        datosdelacuenta.innerHTML = html;
        $('#ingresarmodal').modal('hide');
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML='';
    });
};
