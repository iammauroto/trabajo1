const palapaModel = require('../models/palapaModel')

function buscarTodo(req,res) {
    palapaModel.find({})
    .then(bebidas =>{
        if(bebidas.length){
            return res.status(200).send({bebidas})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e =>{return res.status(404).send({mensaje:`Error al solicitar la informacion ${e}`})})
}

function agregar(req,res) {
    //console.log(req.body)
    new palapaModel(req.body).save()
    .then(info =>{
        return res.status(200).send({mensaje:"Se guardo con exito",info})
    })
    .catch(e =>{
        return res.status(404).send({mensaje:`Error al guardar la informacion ${e}`})
    })
}

function buscarBebida(req, res, next) {
    if(!req.body)req.body={}
    let consulta={}
    consulta[req.params.key]=req.params.value
    console.log(consulta)
    palapaModel.find(consulta)
    .then(bebidas =>{
        if(!bebidas.length) return next()
        req.body.bebidas = bebidas
        return next()
    })
    .catch(e=>{
        req.body.e = e
        return next()
    })
}

function mostrarBebida(req, res) {
    if(req.body.e) return res.status(404).send({mensaje:"error al consultar la informacion"})
    if(!req.body.bebidas) return res.status(204).send({mensaje:"no hay informacion que mostrar"})
    let bebidas = req.body.bebidas
        return res.status(200).send({bebidas})
}

function eliminarBebida(req, res) {
    var bebidas={}
    bebidas = req.body.bebidas
    palapaModel.deleteOne(bebidas[0])
    .then(inf =>{
        return res.status(200).send({mensaje:"Se elimino con exito",inf})
    })
    .catch(e =>{
        return res.status(404).send({mensaje:"Error al eliminar la informacion", e})
    })
}

function actualizarBebida(req, res) {
  const filtro = { [req.params.key]: req.params.value };
  const nuevosDatos = req.body;

  if (!Object.keys(nuevosDatos).length)
    return res.status(400).send({ message: "No hay datos para actualizar." });

  palapaModel.findOneAndUpdate(filtro, nuevosDatos, { new: true })
    .then(bebida => bebida
      ? res.status(200).send({ message: "Bebida actualizada", bebida })
      : res.status(404).send({ message: "Bebida no encontrada" })
    )
    .catch(e => res.status(500).send({ message: "Error al actualizar", error: e }));
}

module.exports={
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}