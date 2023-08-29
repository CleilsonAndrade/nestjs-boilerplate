export function removeSpaces(str: string): string {
  str = str.trim();
  str = str.replace(/\s{2,}/g, ' ');

  return str;
}
