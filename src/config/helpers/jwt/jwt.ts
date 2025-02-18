import jwt from 'jsonwebtoken';

const { JWT_SECRET }: any = process.env;

/**
 * Crea un token con llave jwt
 * @param data información contenida en el token jwt
 * @return string con token generado
 * */
export const createToken = (data: any): string => {
  const token = jwt.sign({ user: data }, JWT_SECRET, {
    expiresIn: '12h',
  });
  return token;
};

/**
 * Desencripta la información de un token
 * @param token string con el token encriptado
 * @return información decodificada del token
 * */
export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};
