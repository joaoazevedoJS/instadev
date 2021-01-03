import { SignOptions } from 'jsonwebtoken';

const signOptions: SignOptions = {
  expiresIn: '1d',
  algorithm: 'RS256',
};

export default {
  privateKey: process.env.JWT_PRIVATE_KEY || 'default',
  publicKey: process.env.JWT_PUBLIC_KEY || 'default',
  signOptions,
};
