const express = require('express')
const app = express()
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');//Importanto el modelo a BD


app.post('/login', (req, res)=>{

    let body = req.body;

    Usuario.findOne({email: body.email},(err, usuarioDB)=>{

        if(err){

            res.status(500).json({
                ok: false,
                mensaje: err
            });
        }else{

            if(!usuarioDB)
            {
                return res.status(400).json({
                    ok: false,
                    mensaje: '(Usuario) o Contraseña invalido'
                });

            }else{

                if(!bcrypt.compareSync(body.password, usuarioDB.password))
                {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Usuario o (Contraseña) invalido'
                    });
                }else{

                    let token = jwt.sign({
                        usuario: usuarioDB
                    }, process.env.SEED , {expiresIn: process.env.CADUCIDAD_TOKEN})

                    res.json({
                      ok: true,
                      usuario: usuarioDB,
                      token,
                      message:"Usuario Autenticado"

                  });

                }
            }

           
        }
    })

})

module.exports= app;