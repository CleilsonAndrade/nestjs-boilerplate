export function arrayDifferences(arr1: string[], arr2: string[]): string[] {
  const diff1 = arr1.filter((item: string) => !arr2.includes(item));
  const diff2 = arr2.filter((item: string) => !arr1.includes(item));

  return [...diff1, ...diff2];
}
