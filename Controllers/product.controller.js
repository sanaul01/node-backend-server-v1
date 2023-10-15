const { getProductService, createProductService, updatePorductService, bulkUpdateProductService } = require("./services/products.service");

exports.getProducts = async(req, res, next)=>{
    try {
        const products = await getProductService();
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
};

exports.postProduct = async(req, res, next)=>{

    try {
        // =====create method ======
        const result = await createProductService(req.body)

        //=====Save method======
    // const product = new Product(req.body);
    // const result = await product.save();
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
};


exports.updateProduct = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await updatePorductService(id, req.body);
        res.status(200).json({
            status:"success",
            message:"Updated successfully",
            data: result
           })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data could not update successfully",
            error: error.message
        })
    }
};
exports.bulkUpdateProduct = async(req, res, next)=>{
    try {
        console.log(req.body)
        const result = await bulkUpdateProductService(req.body);
        res.status(200).json({
            status:"success",
            message:"Updated successfully",
            data: result
           })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data could not update successfully",
            error: error.message
        })
    }
}