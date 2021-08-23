require('dotenv').config(); // Variables' envioren config

const { leerInput,
    inquirerMenu,
    pause } = require('./helpers/inquirer');

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
                const lugares = await busquedas.ciudad( termino );
                console.log(lugares);
                // Buscar los lugares

                // Seleccionar el lugar

                // Mostrar los datos del clima

                // Mostrar resultados

                console.log('Informacion de la ciudad\n'.green);
                console.log('Ciudad: ',);
                console.log('Latitud: ',);
                console.log('Longitud: ',);
                console.log('Temperatura: ',);
                console.log('Min: ',);
                console.log('Max: ',);

                
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