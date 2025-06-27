const mongoose = require('mongoose')
const CONFIG = require('./configuracion')

module.exports={
    connection:null,
    connect: () =>{
        if(this.connection)return this.connection
        return mongoose.connect(CONFIG.DB)
        .then(conn=>{
            this.connection=conn
            console.log('Conectado a la base de datos')
        })
        .catch(e=> console.log('error en la conexion',e))
    }
}