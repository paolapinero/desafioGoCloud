const express = require('express');
const GeneralHelper = require('../helpers/generalHelper');
const generalHelper = new GeneralHelper();
const router = express.Router();
const Subscriptions = require("../models/Subscriptions");
const subscriptions = new Subscriptions();

router.post('/subscriptions',
async (req, res) => {
    try {
        let body = req.body;
        //Valido que no hay campos vacios
        let validations = generalHelper.validations(body,[
            {'field':'rut','function':'validarRut','empty':false},
            {'field':'email','function':'validateEmail','empty':false},
            {'field':'nombre','empty':false},
            {'field':'telefono','function':'validateTelefono','empty':false}
        ]);
        
        if(validations.status){
            const paramSubscription = {
                nombre: body.nombre,
                telefono: body.telefono,
                email: body.email,
                rut: body.rut
            }
            try {
                await subscriptions.create(paramSubscription);
            } catch (error) {
                console.log('Error', error);
                res.status(500).send('Error creando suscripcion')
            }
            
        } else {
            console.log('validaciones', validations);
            res.status(422).send(validations.errors);
        }
        res.status(200).send('Ok');
        
    } catch (error) {
        console.log('Error', error);
        res.status(500).send('error')
    }
});


module.exports = router;