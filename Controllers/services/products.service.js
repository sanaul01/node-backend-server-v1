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

exports.updatePorductByIdService = async(productId, data)=>{
    const result = await Product.updateOne({_id: productId}, {$set: data},{runValidators: true});
    //==========anaother updated method=================
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
};

exports.bulkUpdateProductService = async(data)=>{
    // const result = await Product.updateMany({_id:data.ids}, data.data,
    //     {runValidators: true});
    //     return result;

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id:product.id}, product.data))
    });

    const result = await Promise.all(products);
    return result;
};

exports.deleteProductByIdService = async(id)=>{
    const result = await Product.deleteOne({_id: id});
    return result;
};

exports.bulkDeleteProductService = async(ids)=>{
    const result = await Product.deleteMany({_id: ids});
    return result;
};