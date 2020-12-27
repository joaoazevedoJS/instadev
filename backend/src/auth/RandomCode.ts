import crypto from 'crypto';

function RandomCode(lenght = 6): string {
  let code = '';

  for (let i = 0; i < lenght; i += 1) {
    code += crypto.randomInt(10);
  }

  return code;
}

export default RandomCode;
