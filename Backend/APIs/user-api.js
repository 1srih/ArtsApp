const exp=require("express")
const { ObjectId } = require("mongodb")
const verifyToken = require("../Middlewares/verifyToken");

const userApp = exp.Router()

const {createAccount,login} = require('./Util')
let expressAsyncHandler = require("express-async-handler")

//middleware
let usersCollection 
let artsCollection
let ordersCollection
let eventsCollection
let coursesCollection
let messagesCollection

userApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection')
    artsCollection = req.app.get('artsCollection')
    ordersCollection = req.app.get('ordersCollection')
    eventsCollection = req.app.get('eventsCollection')
    coursesCollection = req.app.get('coursesCollection')
    messagesCollection = req.app.get('messagesCollection')
    next()
})
// Sign Up (Register a new user)
userApp.post("/auth/signup", expressAsyncHandler(createAccount));

// Login (Sign in (Authenticate user))
userApp.post("/auth/login", expressAsyncHandler(login));

// User Routes

// Get user profile
userApp.get("/users/:username", verifyToken , expressAsyncHandler(async(req, res)=>{
    const profile = await usersCollection.findOne({username:req.params.username})
    if(profile == null) res.send("user does not exist")
    res.send({message:'User\'s Profile',payload:profile})
}));

// Update user profile
userApp.put("/users/:username", verifyToken ,expressAsyncHandler( async(req, res) => {
    const updatedProfile = req.body
    await usersCollection.updateOne({ username: req.params.username },{$set:{...updatedProfile}})
    res.send({message:"Profile Changes Successful",payload:updatedProfile})
}));

// Get user’s cart
userApp.get("/users/:userId/cart", verifyToken ,expressAsyncHandler( async(req, res) => {
    const user = await usersCollection.findOne({_id: new ObjectId(req.params.userId)} ,{ projection: { cart: { $elemMatch: { deleted: { $ne: true } } } } })
    res.send({message:'User\'s Cart',payload:user.cart})
}));

// Add item to cart 
userApp.post("/users/:userId/cart", verifyToken ,expressAsyncHandler( async(req, res) => {
    const { artId , quantity ,deleted } = req.body
    await usersCollection.updateOne({ _id:new ObjectId(req.params.userId) },{$addToSet: {cart: { artId : artId , quantity: quantity || 1 ,deleted : deleted}}});
    res.send({message:'Added Item to cart'})
}));

// Remove item from cart(soft delete)
userApp.put("/users/:userId/cart/:artid", verifyToken ,expressAsyncHandler( async(req, res) => {
    await usersCollection.updateOne({_id: new ObjectId(req.params.userId),"cart.artId" : req.params.artid} ,{$set:{"cart.$.deleted" : true}})
    res.send({message:'Removed item from cart'})
}));


// // Order Routes
 
// Get user’s order history
userApp.get("/users/:userId/orders", verifyToken ,expressAsyncHandler( async(req, res) => {
    const user = await usersCollection.findOne({_id: new ObjectId(req.params.userId)})
    res.send({message:"Order history",payload:user.orders || []})
}));

// Place an order
userApp.post("/users/:userId/orders", verifyToken ,expressAsyncHandler( async(req, res) => {
    const order = req.body
    const insertedOrder = await ordersCollection.insertOne({...order,userId : new ObjectId(req.params.userId)})
    await usersCollection.updateOne({_id: new ObjectId(req.params.userId)},{$addToSet :{ orders :{ "orderId": insertedOrder.insertedId , "items" : order.items ,"totalPrice":order.totalPrice,"status":order.status,"orderTime":order.orderTime,"modifyTime":order.modifyTime}}})
    res.send({message:"Order Placed"})
}));

// Track Order
userApp.get("/orders/:orderId", verifyToken ,expressAsyncHandler( async(req, res) => {
    const order = await ordersCollection.findOne({_id:new ObjectId(req.params.orderId)})
    if (!order) {
        return res.status(404).send({ message: "Order not found" });
    }
    res.send({message:"Order Status",payload:order.status})
})); 

// Cancel order
userApp.put("/users/:userId/orders/:orderId", verifyToken ,expressAsyncHandler( async(req, res) => {
    const order = await ordersCollection.updateOne({_id:new ObjectId(req.params.orderId)},{$set:{ status: req.body.status,modifyTime: req.body.modifyTime}})
    await usersCollection.updateOne({ _id:new ObjectId(req.params.userId) }, { $set: { "orders.$[elem].status": req.body.status, "orders.$[elem].modifyTime": req.body.modifyTime }},{arrayFilters: [{ "elem.orderId": new ObjectId(req.params.orderId) }] });
    res.send({message:'Order cancelled'})
})); 

// Artwork Routes

// Get Gallery
userApp.get("/gallery",expressAsyncHandler( async(req, res) => {
    const gallery = await artsCollection.find({deleted:false}).toArray()
    res.send({message:'Retreived Gallery',payload:gallery})
}));

// Get single artwork details
userApp.get("/gallery/:id",expressAsyncHandler( async(req, res) => {
    const art = await artsCollection.findOne({_id:new ObjectId(req.params.id)})
    res.send({message:'Art',payload:art})
}));

// Like an artwork
userApp.put("/gallery/:id/like", verifyToken ,expressAsyncHandler( async(req, res) => {
    const art = req.body
    const updated = art.like ? {$inc : {likes : 1}} : {$inc : {likes : -1}}
    await artsCollection.updateOne({_id:new ObjectId(req.params.id)},updated)
    res.send({message: art.like ? 'Liked the Art' : 'Unliked'})
}));

// Events Routes

// Get all events
userApp.get("/events",expressAsyncHandler(async (req, res) => {
    const currentDate = new Date();
    const events = await eventsCollection.find({ deleted: false }).toArray();

    // events based on date
    const pastEvents = events.filter(event => new Date(event.endDate) < currentDate);
    const currentEvents = events.filter(event => new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate);
    const upcomingEvents = events.filter(event => new Date(event.startDate) > currentDate);

    res.send({message: "All Events",pastEvents,currentEvents,upcomingEvents});
}));


// Get event details
userApp.get("/events/:id",expressAsyncHandler( async(req, res) => {
    const event = await eventsCollection.findOne({_id:new ObjectId(req.params.id)})
    res.send({message:'Event details',payload:event})
}));

// Courses Routes

// Get all courses
userApp.get("/courses",expressAsyncHandler( async(req, res) => {
    const courses = await coursesCollection.find({deleted:false}).toArray()
    res.send({message:'All courses',payload:courses})
}));

// Get course details
userApp.get("/courses/:id",expressAsyncHandler( async(req, res) => {
    const course = await coursesCollection.findOne({_id:new ObjectId(req.params.id)})
    res.send({message:'Course details',payload:course})
}));

// Help & Collaboration Routes

// Submit help requests
userApp.post("/helpQueries",expressAsyncHandler( async(req, res) => {
    const message = req.body
    await messagesCollection.insertOne(message) 
    res.send({message:'Message sent successfully'})
}));


module.exports = userApp