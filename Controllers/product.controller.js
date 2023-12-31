const { getProductService, createProductService, updatePorductByIdService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require("./services/products.service");

exports.getProducts = async (req, res, next) => {
    try {
        let filters = { ...req.query }

        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field])

        // use operator sisterm like{gt, gte, lt, lte}. using filter
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        filters = JSON.parse(filtersString)

        const queries = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        };

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        };

        const products = await getProductService(filters, queries);
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

exports.postProduct = async (req, res, next) => {

    try {
        // =====create method ======
        const result = await createProductService(req.body)

        //=====Save method======
        // const product = new Product(req.body);
        // const result = await product.save();
        result.logger();

        res.status(200).json({
            status: "success",
            message: "Data sended successfully",
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


exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updatePorductByIdService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Updated successfully",
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


exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await bulkUpdateProductService(req.body);
        res.status(200).json({
            status: "success",
            message: "Updated successfully",
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


exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductByIdService(id)

        if (!result.deleteCount) {
            res.status(400).json({
                status: "fail",
                error: "could not delet the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data could not delete successfully",
            error: error.message
        })
    }
};

exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await bulkDeleteProductService(req.body.ids);
        res.status(200).json({
            status: "success",
            message: "Delete successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data could not delete successfully",
            error: error.message
        })
    }
};