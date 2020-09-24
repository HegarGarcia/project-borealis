export default function createProxy({ defaultValue = "" } = {}) {
  return new Proxy(
    {},
    {
      get(target, key) {
        return key in target ? target[key] : defaultValue;
      },
    }
  );
}
