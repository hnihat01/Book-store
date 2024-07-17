// const jwt=require('jsonwebtoken');


// module.exports=(req,res,next)=>{
//     const authHeader=req.get('Authorization');
//     if(!authHeader){
//         const error= new Error('Not authentication');
//         err.statusCode=401;
//         throw error;
//     }
//     const token=req.get('Authorization').split(' ')[1];
//     let decodedToken;
//     try{
//         decodedToken=jwt.verify(token,'somesupersecretsecret')
//     }
//     catch(err){
//         err.statusCode=500;
//         throw err;
//     }

//     if(!decodedToken){
//         const error= new Error('Not authentication');
//         err.statusCode=401;
//         throw error;
//     }
//     req.userId=decodedToken.userId;
//     next();
// }


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        return next(error); // Use return and call next with the error
    }
    
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (err) {
        err.statusCode = 500;
        return next(err); // Use return and call next with the error
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        return next(error); // Use return and call next with the error
    }
    
    req.userId = decodedToken.userId;
    next();
};
