const { verify } = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    const authToken  = req.headers.authorization;
    
    
    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")
    try {
        const {sub} = verify(token, process.env.JWT_SECRET);
        return next();
    } catch (err){
        return res.status(401).end()
    }
}