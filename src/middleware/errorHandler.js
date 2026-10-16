function errorHandler(error, req, res, next) {
    console.error(error);

    if (error.name === "AuthenticationError" || error.status === 401){
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }

    if (error.name === "AuthorizationError" || error.status === 403){
        return res.status(403).json({
            success: false,
            message: error.message,
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: error.message
        });
    }

    if(error.name === "ZodError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    if (error.status === 409){
        return res.status(409).json({
            success: false,
            message: error.message,
        });
    }

    res.status(error.status || 500).json({
        success: false,
        message: "Internal server error",
    });
}

export default errorHandler