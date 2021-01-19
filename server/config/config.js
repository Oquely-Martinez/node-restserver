//===============================
//    Configuracion de Puerto
//===============================

process.env.PORT = process.env.PORT || 3000;


//====================================
//  Entorno
//====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'



//====================================
//  Base de Datos
//====================================

let urlDB;

if(process.env.NODE_ENV === 'dev')
{
    urlDB = 'mongodb://localhost:27017/cafe'
    
}else{

    urlDB = 'mongodb+srv://strider:3fc2Je6l310HTUlf@cluster0.cynbq.mongodb.net/cafe'

}

process.env.URLDB = urlDB;

