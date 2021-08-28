const express = require('express')
const hb = require('express-handlebars')
const path = require('path')
const { Sequelize, DataTypes } = require('sequelize');


const app = express()


const sequelize = new Sequelize('mujer', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307
});

const reportes = sequelize.define('reportes', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  cedula: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.BOOLEAN
    // allowNull defaults to true
  },
}, {
  // Other model options go here
});


app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.engine('hbs',hb({layoutsDir:'views/layouts',defaultLayout:'main', extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/formulario',(req, res)=>{
  res.render('formulario')
})

app.get('/gracias',(req, res)=>{
  res.render('gracias')
})

app.post('/formulario',async(req, res)=>{
try{
  const {nombre, apellido ,direccion, cedula} = req.body
  console.log(nombre, apellido ,direccion, cedula)
 await reportes.create({
    nombre: nombre, 
    apellido: apellido,
    direccion: direccion,
    cedula: cedula,
    status: false
  })
  res.redirect('/gracias')
} catch(err) {
  console.log(err)
}
})

app.get('/reportes',async (req, res)=>{
 try {
  let data = await reportes.findAll()
  console.log(data)
  data = data.map(res => res.dataValues )
  res.render('reportes', { data: data})
 } catch(err) {
   console.log(err)
 }
})

app.post('/reportes/atendido/:id',async(req, res)=>{
  const id = req.params.id

  await reportes.update({status: true}, {where: {id: id}})
  res.redirect('/reportes')
})


app.get('/',(req, res)=>{
  res.render('index')
})

app.listen(3000, ()=> sequelize.sync({force: false}))