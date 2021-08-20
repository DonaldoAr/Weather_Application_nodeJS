const { leerInput,
    inquirerMenu,
    pause } = require('./helpers/inquirer');

require('colors');


const main = async () => {
    let opt;
    
    do {
        opt = await inquirerMenu();
        switch ( opt ) {
            
            
            case 1:
                console.log('Hola');
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