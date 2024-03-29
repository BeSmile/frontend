module.exports = {
  '*.{js,jsx,less,md,json}': ['prettier --write'],
  '*.ts?(x)': ['prettier --parser=typescript --write', 'eslint --quiet'],
  '*.less': ['stylelint --fix'],
};
