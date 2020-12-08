const optsDes = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    }
}
const optsComp = {
    completado: {
        default: true,
        alias: 'c',
        desc: 'Marca como completado o pendiente la tarea'
    }
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', optsDes)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opts, optsComp)
    .command('actualizar', 'Borrar una tarea', optsDes)
    .help()
    .argv;

module.exports = {
    argv
}