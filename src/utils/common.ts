export function delay<T>(ms: number = 1000, func?: () => T) {
  return new Promise(resolve => setTimeout(() => resolve(func), ms));
}

export function getAbbreviation(...strings: string[]): string {
  return strings.map(str => str.replace(/(\S)\S+\s?/g, '$1').toUpperCase()).join('');
}
