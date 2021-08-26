require('dotenv').config(); // Variables' envioren config

const { leerInput,
    inquirerMenu,
    pause,
    listarLugares } = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');
require('colors');

//console.log(process.env.MAPBOX_KEY);

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
                const lugarSelec= lugares.find(l => l.id === id );
                // Mostrar los datos del clima
                const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng);
                //console.log(clima);
                // Mostrar resultados

                console.log('Informacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSelec.nombre);
                console.log('Latitud: ', lugarSelec.lat);
                console.log('Longitud: ', lugarSelec.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Min: ', clima.min);
                console.log('Max: ', clima.max);
                console.log('Como está el clima: ', clima.desc)

                await pause();
                break;
            case 2:
                console.log('Hola2');
                await pause();
                break;
            case 0:
        
                break;
                
        }
    } while (opt !== 0);

    //await pause();
}
    

main();