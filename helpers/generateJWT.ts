import jwt from "jsonwebtoken";

const generateJWT = (uid: string, email: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email, name }; //Por ver el estado en que se quede este token

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
