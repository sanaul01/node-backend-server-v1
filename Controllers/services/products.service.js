const Product = require("../../models/products")

exports.getProductService = async()=>{
    // const products = await Product
    // .where("name").equals(/\w/)
    // .where("quantity").gt(200).lt(500)
    // .limit(2).sort({quantity: -1});
    
    const products = await Product.find({});
    return products;
};

exports.createProductService = async(data)=>{

    // ======save method======= 
    // const product = new Product(data);
    // const result = await product.save();

    // =========create method========== 
    const product = await Product.create(data);
    return product;
};

exports.updatePorductService = async(productId, data)=>{
    const result = await Product.updateOne({_id: productId}, {$set: data},{runValidators: true});
    //==========anaother updated method=================
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
}