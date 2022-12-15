// 加密方式
export enum ENCRYPTION_TYPE {
  'SHA1' = 'nbs',
  'BCRYPT' = 'nbB',
  'MD5' = 'nbm',
  // 'ARGON2' = 'argon2i',
}

export const getEncryptionType = () => {
  return Object.entries(ENCRYPTION_TYPE).map((item) => ({
    label: item[0],
    value: item[1],
  }));
};
