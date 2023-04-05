const app = require('express')();
const cors = require('cors');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwtoken = require('jsonwebtoken');
const Razorpay = require('razorpay');

const USER = require('./models/Users');
const Authenticate = require('./Authenticate');

require('dotenv').config();
require('./db.js');
require('./config/razorpay');

const paymentRouter = require('./routes/paymentRoutes');

app.use(cors(/*{
  origin:'http://localhost:3000', 
  credentials:true,
  optionSuccessStatus:200
}*/));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookies());

app.use('/transaction',paymentRouter);

app.get('/auth',Authenticate, (req,res)=>{
  if(!req.authorized)
    return res.status(200).json({authorized:false});
  return res.status(200).json({authorized:true});
});
app.post('/login', async (req,res)=>{
  try{
    console.log(req.body);
  const {email,pwd} = req.body;
  console.log(req.body);
  if(!email || !pwd)
    return res.status(422).json({errMsg:'All Fields Required!'});
  
  let user = await USER.findOne({email});
  if(!user)
    return res.status(400).json({errMsg:'User does not exists!'});
  
  if(await bcrypt.compare(pwd,user.password)){
    //Successful login
    let token = await jwtoken.sign({_id:user._id},process.env.SECRET_KEY);
    user.token = token;
    await user.save();
    res.cookie('jwtoken',token,{
      secure: true,
      sameSite:'none'
    });
    console.log(`${user.email} logged in`);
    return res.status(200).json({token})
  }
  //invalid credentials
  return res.status(400).json({errMsg:'Invalif Credentials!'});
  }catch(err){
    console.log("/login",err);
    return res.status(500).json({errMsg:'Some Internal Server Error Occured!!!'})
  }
})
app.post('/signup',async (req,res)=>{
  try{
    const {fName:firstName, lName:lastName, email, phone, pwd} = req.body;
    if(!firstName || !lastName || !email || !pwd || !phone)
      return res.status(422).json({errMsg:'All Fields required!!'});
  
    //Checking if email already Exists...
    let userExists = await USER.findOne({email});
    if(userExists)
      return res.status(400).json({errMsg:'Email Already Exists!'});
    
    let hashed_pass = await bcrypt.hash(pwd,10);
  
    let user = new USER({
      firstName,
      lastName,
      email,
      phone,
      password:hashed_pass
    });
    await user.save();
    console.log(`${user.email} registered Successfully `);
    return res.status(200).json({msg:'Registration Successful!!'});
  }catch(err){
    console.log("/signup",err);
    return res.status(500).json({errMsg:'Some Internal Server Error Occured!!!'})
  }
})
app.get('/logout', Authenticate, (req,res)=>{
  console.log(req.cookies.jwtoken,"-");
  res.clearCookie('jwtoken')
  res.status(200).send()
})

/*
app.get('getCart', Authenticate, (req, res)=>{
  
})
app.post('/addToCart', Authenticate, (req, res)=>{
  
})
app.post('/removeFromCart', Authenticate, (req, res)=>{
  
})
app.post('/updateCart', Authenticate, (req, res)=>{
  
})
*/ //Cart?
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZOR_API_KEY })
)


app.listen(5000,()=>{
  console.log("Server listening on localhost:5000");
})
