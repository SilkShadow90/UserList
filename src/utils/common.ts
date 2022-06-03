export function delay<T>(ms: number = 1000, func?: () => T) {
  return new Promise(resolve => setTimeout(() => resolve(func), ms));
}
