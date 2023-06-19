
type LessVars = {
  [key: string]: string
}

const lessToJs = (content: string): LessVars => {
  const Reg = new RegExp(/\n\r?/, 'ig');
  const variablesArr: string[] = content.split(Reg) || [];
  return variablesArr.filter(Boolean).reduce((variables: LessVars, variable: string) => {
    const reg = /([a-zA-Z-_]+): (#?\w+);?/;
    const matches = reg.exec(variable);
    if(!matches) {
      return variables;
    }
    const [, key, value] = matches;
    variables[key] = value;
    return variables;
  }, {});
};

export default lessToJs;