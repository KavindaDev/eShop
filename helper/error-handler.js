function errorHandler(err, req, res, next) {

    if (err.name === 'UnauthorizedError') {
        //jwt error
        res.status(401).json({message: "This user is not authorised"})
    }

    if(err.name === 'ValidationError')  {
        //validation error
       return res.status(400).json({message: err})
    }

    //server error
    return res.status(500).json(err);
}

module.exports = errorHandler;