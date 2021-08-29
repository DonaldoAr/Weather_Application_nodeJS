const fs = require('fs');
const axios = require('axios').default;
require('colors');
class Busquedas{
    historial = [];
    dbPath = './db/database.json';

    constructor(){
        // TODO: Leer db si existe
        this.leerDB();
    }

    get historialCapitalizado(){
        // Capitalizar cada palabra
        const data = this.leerDB();
        if( data ){
            return null;
        }
        const ad = data.forEach(lugar => {
            lugar.toUpperCase(); 
        });
        //return this.historial;
        console.log(data);
        return data;
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
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
            //console.log(resp.data.features);
            return resp.data.features.map( lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],  
            }));
        }catch(error){
            return [];
        }
    }

    get paramsOpenweathermap(){
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
        }
    }

    async climaLugar( lat, lon){
        try{
            // instance axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsOpenweathermap,
            })
            const resp = await instance.get();
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp:resp.data.main.temp,
            };
        }catch(error){
            console.log(error);
        }
    }

    agregarHistorial( lugar = ''){
        if( this.historial.includes( lugar.toLocaleLowerCase() )){
            return;
        }
        // TODO: Prevenir duplicidad
        this.historial.unshift( lugar.toLocaleLowerCase() );
        // Grabar en DB
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify( payload ) );
    }

    leerDB(){
        // Debe de existir...
        if( !fs.existsSync( this.dbPath ) ) return null;
        
        // Cargar la información 
        // const info = readFileSync
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
        const data = JSON.parse( info );
        return data;
        //const a = this.historialCapitalizado()
        //console.log(a)
    }
}

module.exports = Busquedas;