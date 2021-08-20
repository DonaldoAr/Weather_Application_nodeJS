const inquirer = require('inquirer');
//const Tarea = require('../models/tarea');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        //choices: ['opt1', 'opt2', 'opt3']
        choices: [
            {
                value: 1,
                name: '1'.green+'. Buscar ciudad'
            },
            {
                value: 2,
                name: '2'.red+'. Historial'
            },
            {
                value: 0,
                name: '0'.red+'. Salir'
            },
        ]
    }
]

const inquirerMenu = async()=>{
    console.clear();
    console.log('======================================='.red);
    console.log(' Seleccione una opción '.white);
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

const leerInput = async( message )=>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){ // We should write the data
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx}.- ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );

    return id;
}

const confirmar = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt( question );
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx}.- ${tarea.desc}`,
            //checked: true
            checked: (tarea.completadoEn)? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta );

    return ids;
}



module.exports={
    inquirerMenu,
    pause,
    leerInput,
    //listadoTareasBorrar,
    //confirmar,
    //mostrarListadoChecklist
}