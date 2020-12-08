const fs = require('fs');

//GUARDAMOS TEMPORALMENTE EL POR HACER
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer; //esto es lo que se acaba de crear
}
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    /**
     * de listadoirporhacer enocntramos en ese arreglo el index o el id como se entienda,
     * tarea que asignamos como parametro es igual a esta tarea.descripcion que tiene que 
     * ser exactamente igual a descripcion, si en caso el index regresa un -1 ya que puede
     * resultar ese -1 si no son es exactamente igual la descripcion
     */
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true; //la tarea se realizó correctamente
    } else {
        return false;
    }
}
const borrar = (descripcion) => {
    cargarDB();
    /**
     * regreso los elementos que no coincidan con la descripcion, entonces ese es el elemento 
     * que tengo que borrar, filter trae el elemento excluido que es el nuevo listado
     */
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}