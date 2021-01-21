const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');//Importanto el modelo a BD

const { verificaToken, verificaAdmin_role} = require('../middlewares/autenticacion');


app.get('/usuario', verificaToken , (req, res)=>{


    let desde = req.query.desde || 0 ;
    desde = Number(desde);

    let limite = req.query.limite || 20;
    limite = Number(limite);


    Usuario.find({estado: true},'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios)=>{

                if(err){

                    res.status(400).json({
                        ok: false,
                        mensaje: err
                    });
                }else{
    
                   Usuario.count({estado: true}, (err, conteo)=>{

                       res.json({
                           ok: true,
                           registros: conteo,
                           usuarios
                       });

                   })
    
    
                }
    

            })

    //res.json('get Usuario')
  })
  
  app.post('/usuario', [verificaToken, verificaAdmin_role] , function (req, res) {
      //res.json('post Usuario')
  
      let body = req.body

        //Intancio al modelo
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        }); 

        usuario.save((err, usuarioDB)=>{

            if(err){

                res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }else{

                //usuarioDB.password = null

                res.json({
                    ok: true,
                    usuario: usuarioDB
                });

            }

        });

    })
   
  
    app.put('/usuario/:id', [verificaToken, verificaAdmin_role] , function (req, res) {
        let id = req.params.id;
        let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

        Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD)=>{

            if(err){

                res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }else{
                res.json({
                    ok: true,
                    usuario: usuarioBD
                    
                })

            }

        })



    })
  
    app.delete('/usuario/:id', [verificaToken, verificaAdmin_role] , function (req, res) {

        let id = req.params.id;

        ////////////Eliminacion fisica
        //Usuario.findByIdAndRemove(id,(err, usuarioBorrado)=>{

        let cambiarEstado = {
            estado : false
        };

        Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true}, (err, usuarioBorrado)=>{
    

            if(err){

                res.status(400).json({
                    ok: false,
                    mensaje: err
                });
                
            }else{

                if(!usuarioBorrado){
                    res.status(400).json({
                        ok: false,
                        erro:'El usuario no existe'
                    });

                }else{

                    res.json({
                        ok: true,
                        usuario: usuarioBorrado
                    })

                }


            }
        })

      


    })
  
    module.exports= app;