const axios = require('axios').default;

class Busquedas{
    historial = ['Tegucigalpa', 'Madril', 'San Jose'];

    constructor(){
        // TODO: Leer db si existe
    }

    async ciudad(lugar = ''){
        

        try{
            // Peticion http
            //console.log('ciudad ',lugar);
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return []; // Retornar las lugares que coincidan
        }catch(e){
            return [];
        }

    }

}

module.exports = Busquedas;