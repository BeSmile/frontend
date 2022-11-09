export default function isCancel(value: { __CANCEL__: any }) {
  return !!(value && value.__CANCEL__);
}
