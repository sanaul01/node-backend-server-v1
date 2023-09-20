const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// Midilware
app.use(express.json());
app.use(cors());


// schema design 
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "please provide a naem for this product"],
        trim: true,  //remove speech,
        unique:[true, "Name must be at least 3 characters"],
        maxLength:[100, "Name is too large"]
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: [0, "price can't be negative"]
    },
    unit:{
        type: String,
        required: true,
        enum:{
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUE} must be kg/litre/pcs"
        }
    },
    quantity:{
        type: Number,
        required: true,
        min: [0, "quantity can't be negative"],
        validate:{
            validator:(value)=>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:["in-stock", "out-of-stock", "discontinued"],
            message: "statuse can't be {VALUE}"
        }
    },
    // taking as a reference 
    // supplier:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // // embeded model 
    // categories:[{
    //     name:{
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
},{
    timestamps: true
});

// Use mongoose middleware for saving data: pre/post
// =====mongoose middleware is created on schema=====
productSchema.pre('save', function(next){
    if(this.quantity == 0){
        this.status= "out-of-stock"
    }
    next();
});

// after saving data 
// after saving data takes two function: doc and next
productSchema.post('save', function(doc, next){
    console.log("after saving data");

    next();
});

// instance method 
productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`)
}

// schema model 
const Product = mongoose.model("Product", productSchema)

app.get('/', (req, res)=>{
    res.send("welcome to my server at node mongodb backend")
});

// ===========Post Data ==============
app.post('/api/v1/product', async(req, res, next)=>{

    try {
        // =====create method ======
        // const result = await Product.create(req.body)

        //=====Save method======
    const product = new Product(req.body);
    // if(product.quantity == 0){
    //     product.status= "out-of-stock"
    // }
    const result = await product.save();
    result.logger();
   
    res.status(200).json({
    status:"success",
    message:"Data sended successfully",
    data: result
   })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data could not send successfully",
            error: error.message
        })
    }
}); 

// ============Get data===========
app.get('/api/v1/product', async(req, res, next)=>{
    try {
        const products = await Product
        .where("name").equals(/\w/)
        .where("quantity").gt(200).lt(500)
        .limit(2).sort({quantity: -1});

        // ==================Query one data==================
        // const product = await Product.findById("6505b6e7a4eb76c982f76216")
        
        res.status(200).json({
            status: "success", 
            data: products
        })
        
    } catch (error) {
       res.status(400).json({
        status: "Fail data",
        message: "Can not get data",
        error: error.message
       }) 
    }
})

module.exports = app;