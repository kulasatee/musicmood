var jwt = require('jsonwebtoken');
const tokenSecret = 'KE4STf9l2Mf36Q2uyZj2dD31S4C53Ki4'

function generateToken(data){
    return jwt.sign(
        {account_id: data.account_id, username: data.username, role: data.role},
        tokenSecret
    );
}

function isAuth(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader?.includes("Bearer ")) {
        return res.json({
            message: "Invalid token"
        });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, tokenSecret, (err, user) => {
        if(err) {
            return res.status(403).json(err.message);
        }
        req.user = user;
        console.log(req.user)
        next()
    })
}

function isStaff(req,res,next){
    if(req.user.role != 'staff'){
        console.log("non")
        return res.status(403).send("You do not have permission to perform this action");
    }else{
        next()
    }
}

module.exports = {
    generateToken,
    isAuth,
    isStaff
}