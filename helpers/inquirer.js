const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        //choices: ['opt1', 'opt2', 'opt3']
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
]

const inquirerMenu = async()=>{
    console.clear();
    console.log('======================================='.red);
    console.log(' Seleccione una opción '.red);
    console.log('======================================='.red);

    const { option } = await inquirer.prompt(menuOpts);

    return option;
}

const pause = async () =>{
    const press_intro = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${"Enter".green} to continue...`,
        }
    ]
    //console.clear();
    console.log('\n')
    const { input } = await inquirer.prompt(press_intro);
    return input;
}

module.exports={
    inquirerMenu,
    pause
}