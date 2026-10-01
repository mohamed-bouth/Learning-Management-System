function errorHandler(error, req, res, next) {
    console.error(error);

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message,
        });
    }



    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error",
        errors: {
            error,
        },
    });
}

export default errorHandler