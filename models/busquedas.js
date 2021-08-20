
class Busquedas{
    historial = ['Tegucigalpa', 'Madril', 'San Jose'];

    constructor(){
        // TODO: Leer db si existe
    }

    async ciudad(lugar = ''){
        // Peticion http
        console.log(lugar);
        return []; // Retornar las lugares que coincidan
    }

}

module.exports = Busquedas;