const axios = require('axios').default;

class Busquedas{
    historial = ['Tegucigalpa', 'Madril', 'San Jose'];
    constructor(){
        // TODO: Leer db si existe
    }

    get paramsMapbox(){
        return {
            'access_token': 'pk.eyJ1IjoiZG9uYWxkbzciLCJhIjoiY2tzbDJ0cmxyMGZyeTJ2dGVpcWlxMGFnaCJ9.4LjFZLEiaUhrOeJJ8gbrDQ',
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = ''){
        try{
            // Peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();
            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Que.json?access_token=pk.eyJ1IjoiZG9uYWxkbzciLCJhIjoiY2tzbDJ0cmxyMGZyeTJ2dGVpcWlxMGFnaCJ9.4LjFZLEiaUhrOeJJ8gbrDQ&limit=5&language=es');
            console.log(resp.data);
            return []; // Retornar las lugares que coincidan
        }catch(e){
            return [];
        }

    }

}

module.exports = Busquedas;