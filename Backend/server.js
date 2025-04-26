const exp =require('express')
const path = require('path')
const app = exp()

require('dotenv').config()

app.use(exp.json())
app.use("/ArtsApp", exp.static(path.join(__dirname,'../frontend/build')))

const mongoClient = require('mongodb').MongoClient
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const artsDBObj=client.db('artsappdb')

    const usersCollection = artsDBObj.collection('users')
    const adminCollection = artsDBObj.collection('admin')
    const artsCollection = artsDBObj.collection('gallery')
    const ordersCollection = artsDBObj.collection('orders')
    const eventsCollection = artsDBObj.collection('events')
    const coursesCollection = artsDBObj.collection('courses')
    const messagesCollection = artsDBObj.collection('queries')

    app.set('usersCollection',usersCollection)
    app.set('adminCollection',adminCollection)
    app.set('artsCollection',artsCollection)
    app.set('ordersCollection',ordersCollection)
    app.set('eventsCollection',eventsCollection)
    app.set('coursesCollection',coursesCollection)
    app.set('messagesCollection',messagesCollection)

    console.log("DB conected")
})
.catch(err=>{
    console.log("error in db connection ",err)
})

const userApp = require("./APIs/user-api.js")
const adminApp = require("./APIs/admin-api.js")

app.use('/user-api',userApp)
app.use('/admin-api',adminApp)



app.use((err,req,res,next)=>{
    res.send({status:'error',message:err.message})
})

const port = process.env.port||4000

app.listen(port,()=>console.log(`server on ${port}`))