const formatRut = require('chileanrutvalidator');

class General {

    constructor() {
       
    }

    /*
    body: body a evaluar
    objectRules: campos requeridos y funcion que los valida
    */
   validations(body,objectRules){
        console.log('body',body);
        let data = [];
        data['status'] = true;
        data['errors'] = [];
        let validation = [];
        for (const iterator of objectRules) {
            console.log('campo a evaluar ',iterator.field);
            //si empty es false, el campo es requerido
            if(!iterator.empty){
                if(body[`${iterator.field}`] == undefined || body[`${iterator.field}`] == null ){
                    console.log(body[`${iterator.field}`],' es vacio');
                    data.status = false;
                    data['errors'].push({
                        'message': 'El campo '+iterator.field+' es requerido'
                    });
                }
            }
            //se llama a funcion que valida el campo evaluado
            if(iterator.function != null  &&  iterator.function !=undefined) {
                if (body[iterator.field] != null && body[iterator.field] != undefined){
                    validation = this[iterator.function](body[iterator.field])
                    if (!validation.status){
                        data.status = false;
                        data['errors'].push({
                            'message': validation.message
                        });
                    }
                }
                
            }
        }
        return data;
    }

    validarRut(rut){
        const valida_rut = formatRut.validarRut(rut);
        let data = [];
        data['status'] = true;
         if(!valida_rut){
            data['status'] = false;
            data['message'] = 'Rut inválido';
         }
        return data;
    }

    validationss(body,objectRules){
        console.log('body',body.rut);
        let data = [];
        for (const iterator of required) {
            console.log('campo a evaluar ',iterator);
            if(body[`${iterator}`] == undefined || body[`${iterator}`] == null ){
                console.log(iterator,' es vacio');
                data['status'] = false;
                data['message'] = 'The field '+iterator+' is required';
                return data;
            }
        }
        
        data['status'] = true;
        return data;
    }
    
    validateTelefono(telefono) {
        let number = Number(telefono);
        let data = [];
        data['status'] = true;
        if (isNaN(number) || telefono.length != 9) {
            data['status'] = false;
            data['message'] = 'El teléfono debe ser numerico';
        }
        return data;
    }

    validateEmail(mail) {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let data = [];
        data['status'] = true;
        if (!emailRegex.test(mail)) {
            console.log("Email no válido");
            data['status'] = false;
            data['message'] = 'Mail inválido';
        }
        return data;

    }

}

module.exports = General;
