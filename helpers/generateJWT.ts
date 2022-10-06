import jwt from "jsonwebtoken";

const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }; //Por ver el estado en que se quede este token

    jwt.sign(payload, process.env.SECRET_JWT_KEY || '', {
        expiresIn: '4h'
    }, (error, token) => {
        if(error){ 
            console.log(error);
            return reject("Can't generate JWT")
        }
        resolve(token)

    });
  });
};

export default generateJWT;


