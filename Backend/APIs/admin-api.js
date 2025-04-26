const exp=require("express")
const { ObjectId } = require("mongodb")
const verifyToken = require("../Middlewares/verifyToken");
const upload = require('../Middlewares/upload');

const adminApp = exp.Router()

const {createAccount,login} = require('./Util')
let expressAsyncHandler = require("express-async-handler")

//middleware
let usersCollection 
let artsCollection
// let ordersCollection
let eventsCollection
let coursesCollection
let messagesCollection

adminApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection')
    artsCollection = req.app.get('artsCollection')
    // ordersCollection = req.app.get('ordersCollection')
    eventsCollection = req.app.get('eventsCollection')
    coursesCollection = req.app.get('coursesCollection')
    messagesCollection = req.app.get('messagesCollection')
    next()
})
// Sign Up (Register a new admin)
adminApp.post("/auth/signup", expressAsyncHandler(createAccount));

// Login (Sign in (Authenticate admin))
adminApp.post("/auth/login", expressAsyncHandler(login));


// Admin Routes

// Add new artwork
// adminApp.post("/gallery",  verifyToken ,expressAsyncHandler(async(req, res) => {
//     const art = req.body
//     await artsCollection.insertOne(art)
//     res.send({message:'Added Artwork'})
// }));


adminApp.post(
    "/gallery",
    verifyToken,
    upload.array("images"), // accept multiple images, or use .single('image') for one
    expressAsyncHandler(async (req, res) => {
      const imageUrls = req.files.map(file => file.path); // Cloudinary URLs
  
      const newArtwork = {
        ...req.body,
        images: imageUrls,
      };
  
      await artsCollection.insertOne(newArtwork);
      res.send({ message: "Added Artwork", artwork: newArtwork });
    })
  );

// Update/Delete artwork
adminApp.put("/gallery/:id", verifyToken , expressAsyncHandler(async(req, res) => {
    await artsCollection.updateOne({_id:new ObjectId(req.params.id)},{$set : {...req.body}})
    res.send({message: req.body.deleted ? 'Artwork deleted' : 'Artwork updated'})
}));

// Create new event
// adminApp.post("/events", verifyToken , expressAsyncHandler(async(req, res) => {
//     await eventsCollection.insertOne(req.body)
//     res.send({message : "Event created successfully"})
// }));

adminApp.post("/events",upload.array('images'), verifyToken , expressAsyncHandler(async(req, res) => {
    try {
        // Extract image URLs from Cloudinary (from req.files)
        const imageUrls = req.files.map(file => file.path); // Cloudinary provides the file URL
  
        // Create the event object with data from request body and Cloudinary URLs
        const newEvent = {
          ...req.body, // includes text data (title, description, etc.)
          images: imageUrls, // Add Cloudinary URLs of the images
        };
  
        // Insert the event into your MongoDB collection
        await eventsCollection.insertOne(newEvent);
  
        // Send a success message back
        res.send({ message: 'Event created successfully', event: newEvent });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating event', error });
   
    }
}));

// Update/Delete event details
adminApp.put("/events/:id", verifyToken , expressAsyncHandler(async(req, res) => {
    await eventsCollection.updateOne({_id:new ObjectId(req.params.id)},{$set:{...req.body}})
    res.send({message: req.body.deleted ? "Deleted event":'Updated event'})
}));


// Create new course
adminApp.post("/courses", verifyToken , expressAsyncHandler(async(req, res) => {
    await coursesCollection.insertOne(req.body)
    res.send({message:'Course added'})
}));

// Update/Delete course details
adminApp.put("/courses/:id", verifyToken , expressAsyncHandler(async(req, res) => {
    await coursesCollection.updateOne({_id : new ObjectId(req.params.id)},{$set:{...req.body}})
    res.send({message:req.body.deleted ? 'Deleted Course' : 'Updated Course'})
}));


// Get all help queries / messages
adminApp.get("/helpQueries", verifyToken , expressAsyncHandler(async(req, res) => {
    const messages = await messagesCollection.find({deleted:false}).toArray()
    res.send({message:'All Messages',payload : messages})
}));

// Delete a help query / message
adminApp.put("/helpQueries/:id", verifyToken , expressAsyncHandler(async(req, res) => {
    await messagesCollection.updateOne({_id:new ObjectId(req.params.id)},{$set:{deleted:true}})
    res.send({message:"Deleted Message"})
}));


module.exports = adminApp