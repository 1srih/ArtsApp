const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Create User Account
const createAccount = async(req,res)=>{
    const usersCollection = req.app.get('usersCollection')
    const adminCollection = req.app.get('adminCollection')

    const user = req.body

    // Check if user already exists
    if(user.userType == 'user'){
        let dbuser = await usersCollection.findOne({username:user.username})
        if (dbuser!=null){
            return res.send({message:'user already exists'})
        }
    }
    if(user.userType == 'admin'){
        let dbuser = await adminCollection.findOne({username:user.username})
        if(dbuser != null ){
            return res.send({message:'admin already exists'})
        }
    }

    //Password
    const hashedPassword = await bcryptjs.hash(user.password,9)
    user.password = hashedPassword
    if(user.userType=='user'){
        await usersCollection.insertOne(user)
        res.send({message:"User Account created successfully"})
    }
    if(user.userType=='admin'){
        await adminCollection.insertOne(user)
        res.send({message:"Admin Account created successfully"})
    }
}

// Sign in
const login = async(req,res)=>{
    const userObj = req.app.get('usersCollection')
    const adminObj = req.app.get('adminCollection')
    
    const userCredentials = req.body

    if(userCredentials.userType=='user'){
        let dbuser = await userObj.findOne({username:userCredentials.username})

        // check if user exist
        if(dbuser === null){
            return res.send({message:'user does not exist'})
        }

        //verify password
        let status = await bcryptjs.compare(userCredentials.password,dbuser.password)

        if(status === false){
            return res.send({message:'incorrect password'})
        }

        // create token
        const signedToken = jwt.sign({username:dbuser.username},'artsapp')
        delete dbuser.password

        res.send({message:"Logged in successfully",token:signedToken,user:dbuser})


    }
    if(userCredentials.userType == 'admin'){
        let dbuser = await adminObj.findOne({username:userCredentials.username})

        // check if user exist
        if(dbuser === null){
            return res.send({message:'admin does not exist'})
        }

        //verify password
        let status = await bcryptjs.compare(userCredentials.password,dbuser.password)

        if(status === false){
            return res.send({message:'incorrect password'})
        }

        // create token
        const signedToken = jwt.sign({username:dbuser.username},'artsapp')
        delete dbuser.password

        res.send({message:"Logged in successfully",token:signedToken,user:dbuser})


    }

}

module.exports = {createAccount,login}