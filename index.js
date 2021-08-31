require('dotenv').config(); // Variables' envioren config

const { leerInput,
    inquirerMenu,
    pause,
    listarLugares } = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');
require('colors');

const main = async () => {
    
    const busquedas = new Busquedas();
    let opt;
    
    do {
        opt = await inquirerMenu();
        switch ( opt ) {
            case 1:
                // Mostrar mensaje
                const termino =  await leerInput('Ciudad: ');
                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                // Seleccionar el lugar
                console.log('Seleccione lugar para conocer la temperatura actual...')
                const id = await listarLugares(lugares);
                if( id === '0') continue;
                const lugarSelec= lugares.find(l => l.id === id );
                // Guardar en DB
                busquedas.agregarHistorial( lugarSelec.nombre );
                // Mostrar los datos del clima
                const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng);
                // Mostrar resultados
                console.clear();
                console.log('Informacion de la ciudad y su clima\n'.green);
                console.log('Ciudad: ', lugarSelec.nombre.green);
                console.log('Latitud: ', lugarSelec.lat);
                console.log('Longitud: ', lugarSelec.lng);
                console.log('Temperatura: ', clima.temp,'°C');
                console.log('Min: ', clima.min,'°C');
                console.log('Max: ', clima.max,'°C');
                console.log('Como está el clima: ', clima.desc.green);
                break;
            case 2:
                //busquedas.historial.forEach( (lugar, i) =>{
                busquedas.historialCapitalizado.forEach( (lugar, i) =>{
                    const idx = `${ i +  1}.`.green;
                    console.log( `${ idx } ${ lugar }`);
                });
                break;
            case 0:
                break; 
        }
        if( opt !== 0) await pause();        
    } while (opt !== 0);
}
    

main();