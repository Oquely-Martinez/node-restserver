
const jwt = require('jsonwebtoken');

//==============================
//        Verificar Tohen
//=============================

let verificaToken=(req, res, next)=>{

    let token = req.get('token'); ///Obtiene el header

    jwt.verify(token, process.env.SEED, (err, decoded)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;
        next();////Permite continuar con el programa al pasar por el middleware

    })

    /* res.json({
        token
    }) */


};

//==============================
//        Verificar Role Administrador
//=============================

let verificaAdmin_role=(req, res, next)=>{

    let usuario = req.usuario;


    if(usuario.role === 'ADMIN_ROLE'){

        next();
        
    }else{
        res.json({
            ok: false,
            err: {
                message: 'El usuario no tiene los previlegios suficientes'
            }
        })

    }


}



module.exports = {
    verificaToken, verificaAdmin_role
}