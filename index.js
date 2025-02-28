var express=require ('express')
var mongoose=require('mongoose')

var app=express();
var cors=require('cors')
app.use(cors())
app.use(express.json())

//create a root path
app.get('/',(req,res)=>{res.send("welcome")})

//open the port
app.listen(8080,()=>{console.log("server Connected");
})

//connect mongodb
mongoose.connect('mongodb+srv://sivakumar:siva@cluster0.ufpyq.mongodb.net/bank')
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

//create schema
  let  data=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    amount:Number
  })

  let Data=mongoose.model("account",data)

  // let data1=new Data({
  //   Uname:"ben",
  //   Password:"ben"
  // })

  // data1.save()

  //Api for fetcching the data

  app.get('/data',(req,res)=>{Data.find().then((item)=>res.send(item))})

  //Api for create data
  app.post('/create',(req,res)=>{Data.create(req.body).then((item)=>res.send(item))})

 // API to delete data
app.delete('/delete/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting data", error });
  }
});

// API to update data
app.put('/update/:id', async (req, res) => {
  try {
    const updatedItem = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedItem);
  } catch (error) {
    res.status(500).send({ message: "Error updating data", error });
  }
});
