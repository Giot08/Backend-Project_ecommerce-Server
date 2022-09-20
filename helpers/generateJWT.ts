import jwt from "jsonwebtoken";

const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_JWT_KEY || '', {
        expiresIn: '4h'
    }, (error, token) => {
        if(error){
            console.log(error);
            return reject('No se pudo generar el token')
        }
        resolve(token)

    });
  });
};

export default generateJWT;
