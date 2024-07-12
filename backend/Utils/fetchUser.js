const jwt = require("jsonwebtoken")

//Creating middleware to fetch user
exports.fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'ase240f-ds23/ds31-de-34t42-4vcb');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({"errors":"Please authenticate using a valid token"});
        }
    }
}