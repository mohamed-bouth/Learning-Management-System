import mongoose from "mongoose";

function validateObjectId(req, res, next) {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            const error = new Error(`Invalid id`);
            error.name = "InvalidId";
            error.status = 400;

            return next(error);
        }

        next();
}

export default validateObjectId